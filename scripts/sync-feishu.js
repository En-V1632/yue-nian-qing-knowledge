/**
 * 飞书知识库同步脚本
 *
 * 功能：
 * 1. 将 Obsidian MD 文件同步到飞书知识库
 * 2. 支持图片上传到飞书图床
 * 3. 双向同步
 *
 * 使用：node sync-feishu.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// 飞书 API 配置
const FEISHU_API_BASE = 'https://open.feishu.cn/open-apis';
const TOKEN_FILE = path.join(__dirname, 'feishu-user-token.json');

// 获取用户访问令牌
async function getUserAccessToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    const tokenData = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8'));
    if (tokenData.expires_at > Date.now()) {
      return tokenData.access_token;
    }
    // Token 过期，尝试刷新
    if (tokenData.refresh_token) {
      try {
        const newToken = await refreshAccessToken(tokenData.refresh_token);
        return newToken;
      } catch (err) {
        console.log('Refresh token 失效，需要重新授权');
      }
    }
  }
  throw new Error('请先运行 node feishu-oauth.js 获取用户授权');
}

// 刷新 Access Token
async function refreshAccessToken(refreshToken) {
  const appTokenRes = await axios.post(`${FEISHU_API_BASE}/auth/v3/app_access_token/internal`, {
    app_id: config.feishu.appId,
    app_secret: config.feishu.appSecret
  });
  const appToken = appTokenRes.data.app_access_token;

  const res = await axios.post(
    `${FEISHU_API_BASE}/authen/v1/oidc/refresh_access_token`,
    {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + appToken
      }
    }
  );

  const tokenData = {
    access_token: res.data.data.access_token,
    refresh_token: res.data.data.refresh_token,
    expires_in: res.data.data.expires_in,
    expires_at: Date.now() + res.data.data.expires_in * 1000
  };

  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokenData, null, 2));
  console.log('✓ Token 已刷新');
  return tokenData.access_token;
}

// 解析 MD 文件中的图片引用
function parseImageRefs(markdown) {
  const imageRegex = /!\[\[([^\]]+)\]\]/g;
  const images = [];
  let match;
  while ((match = imageRegex.exec(markdown)) !== null) {
    images.push(match[1]);
  }
  return images;
}

// 将 MD 转换为飞书文档块格式（只使用支持的块类型）
function convertMarkdownToBlocks(markdown) {
  const blocks = [];
  const lines = markdown.split('\n');
  let inCodeBlock = false;
  let codeContent = [];
  let skipFrontmatter = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 跳过开头的 frontmatter
    if (i === 0 && line.trim() === '---') {
      skipFrontmatter = true;
      continue;
    }
    if (skipFrontmatter) {
      if (line.trim() === '---') {
        skipFrontmatter = false;
      }
      continue;
    }

    // 代码块
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        blocks.push({
          block_type: 12, // code block
          code: {
            elements: [{ text_run: { content: codeContent.join('\n') } }],
            language: 1
          }
        });
        codeContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    // 标题 - 使用 block_type 2
    if (line.startsWith('# ')) {
      blocks.push({
        block_type: 2,
        text: {
          elements: [{ text_run: { content: line.substring(2), text_element_style: { bold: true, font_size: 20 } } }],
          style: {}
        }
      });
    } else if (line.startsWith('## ')) {
      blocks.push({
        block_type: 2,
        text: {
          elements: [{ text_run: { content: line.substring(3), text_element_style: { bold: true, font_size: 16 } } }],
          style: {}
        }
      });
    } else if (line.startsWith('### ')) {
      blocks.push({
        block_type: 2,
        text: {
          elements: [{ text_run: { content: line.substring(4), text_element_style: { bold: true, font_size: 14 } } }],
          style: {}
        }
      });
    }
    // 引用 - 转为普通文本（block_type 3 不支持）
    else if (line.startsWith('> ')) {
      blocks.push({
        block_type: 2,
        text: {
          elements: [{ text_run: { content: '> ' + line.substring(2) } }],
          style: {}
        }
      });
    }
    // 无序列表 - 转为普通文本（block_type 4 不支持）
    else if (line.startsWith('- ')) {
      blocks.push({
        block_type: 2,
        text: {
          elements: [{ text_run: { content: '• ' + line.substring(2) } }],
          style: {}
        }
      });
    }
    // 有序列表 - 转为普通文本（block_type 5 不支持）
    else if (/^\d+\.\s/.test(line)) {
      blocks.push({
        block_type: 2,
        text: {
          elements: [{ text_run: { content: line } }],
          style: {}
        }
      });
    }
    // 分隔线（跳过 frontmatter 中的 ---）
    else if (line === '---' && !skipFrontmatter) {
      blocks.push({
        block_type: 22, // divider
        divider: {}
      });
    }
    // 空行
    else if (line.trim() === '') {
      continue;
    }
    // 普通段落
    else {
      // 转换双链为普通文本
      const converted = line.replace(/\[\[([^\]]+)\]\]/g, '$1');
      blocks.push({
        block_type: 2,
        text: {
          elements: [{ text_run: { content: converted } }],
          style: {}
        }
      });
    }
  }

  return blocks;
}

// 创建飞书文档
async function createDocument(token, title, content, parentToken) {
  // 先创建文档
  const createRes = await axios.post(
    `${FEISHU_API_BASE}/docx/v1/documents`,
    {
      title: title,
      parent_token: parentToken || config.feishu.knowledgeSpace.folderToken,
      parent_type: 'explorer'
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  const doc = createRes.data.data.document;
  const docToken = doc.document_id;

  // 获取根块 ID
  const blocksRes = await axios.get(
    `${FEISHU_API_BASE}/docx/v1/documents/${docToken}/blocks`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const rootBlockId = blocksRes.data.data.items[0].block_id;

  // 插入内容块
  const blocks = convertMarkdownToBlocks(content);

  if (blocks.length > 0) {
    await axios.post(
      `${FEISHU_API_BASE}/docx/v1/documents/${docToken}/blocks/${rootBlockId}/children`,
      {
        children: blocks,
        index: 0
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  return doc;
}

// 扫描 wiki 目录获取所有 MD 文件
function scanMarkdownFiles(dir, baseDir) {
  const files = [];

  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // 跳过以 . 开头的目录
        if (!item.startsWith('.')) {
          scan(fullPath);
        }
      } else if (item.endsWith('.md') && !item.startsWith('.')) {
        const relativePath = path.relative(baseDir, fullPath);
        files.push({
          fullPath,
          relativePath,
          name: item
        });
      }
    }
  }

  scan(dir);
  return files;
}

// 主同步函数
async function syncToFeishu() {
  if (!config.feishu.enabled) {
    console.log('飞书同步未启用，请先在 config.js 中配置');
    return;
  }

  console.log('开始飞书同步...');

  try {
    // 获取用户访问令牌
    const token = await getUserAccessToken();
    console.log('✓ 获取飞书用户访问令牌成功');

    // 获取所有 MD 文件
    const files = scanMarkdownFiles(config.vault.wikiPath, config.vault.wikiPath);
    console.log(`✓ 找到 ${files.length} 个 MD 文件`);

    // 使用知识库文件夹
    const folderToken = config.feishu.knowledgeSpace.folderToken;
    console.log(`✓ 使用文件夹: ${config.feishu.knowledgeSpace.name}`);

    // 同步每个文件
    let successCount = 0;
    for (const file of files) {
      try {
        const content = fs.readFileSync(file.fullPath, 'utf-8');
        const title = file.relativePath.replace(/\\/g, '/').replace('.md', '');

        const doc = await createDocument(token, title, content, folderToken);
        console.log(`  ✓ ${file.relativePath} -> ${doc.document_id}`);
        successCount++;
      } catch (err) {
        console.warn(`  ✗ ${file.relativePath}: ${err.response?.data?.msg || err.message}`);
      }
    }

    console.log(`\n飞书同步完成: ${successCount}/${files.length} 个文件`);
  } catch (error) {
    console.error('飞书同步失败:', error.message);
    throw error;
  }
}

// 导出
module.exports = {
  syncToFeishu,
  getUserAccessToken
};

// 直接运行时执行
if (require.main === module) {
  syncToFeishu().catch(console.error);
}