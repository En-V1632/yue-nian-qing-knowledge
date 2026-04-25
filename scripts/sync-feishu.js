/**
 * 飞书知识库同步脚本
 *
 * 功能：
 * 1. 将 Obsidian MD 文件同步到飞书知识库
 * 2. 支持图片上传到飞书图床
 * 3. 双向同步（需配置 Webhook 或定时拉取）
 *
 * 使用前提：
 * 1. 在 open.feishu.cn 创建自建应用
 * 2. 开通「知识库」权限
 * 3. 配置 scripts/config.js 中的 feishu 配置
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// 飞书 API 配置
const FEISHU_API_BASE = 'https://open.feishu.cn/open-apis';

// 获取飞书访问令牌
async function getTenantAccessToken() {
  const response = await axios.post(`${FEISHU_API_BASE}/auth/v3/tenant_access_token/internal`, {
    app_id: config.feishu.appId,
    app_secret: config.feishu.appSecret
  });
  return response.data.tenant_access_token;
}

// 创建知识库空间
async function createKnowledgeSpace(token, name, description) {
  const response = await axios.post(
    `${FEISHU_API_BASE}/drive/v1/files/create_folder`,
    {
      name: name,
      description: description
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
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

// 上传图片到飞书图床
async function uploadImage(token, filePath) {
  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);

  const formData = new FormData();
  formData.append('file', fileBuffer, fileName);
  formData.append('file_name', fileName);
  formData.append('parent_type', 'message');
  formData.append('parent_node', 'root');

  const response = await axios.post(
    `${FEISHU_API_BASE}/drive/v1/media/upload_file`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return response.data.data.file_key;
}

// 将 MD 转换为飞书文档格式
function convertMarkdownToFeishu(markdown, imageMap) {
  let content = markdown;

  // 替换嵌入图片为上传后的链接
  for (const [localPath, url] of imageMap) {
    content = content.replace(`![[${localPath}]]`, `![${localPath}](${url})`);
  }

  // 转换 Obsidian 双链为普通链接
  content = content.replace(/\[\[([^\]]+)\]\]/g, '$1');

  return content;
}

// 创建飞书文档
async function createDocument(token, title, content, parentToken) {
  const docContent = {
    title: title,
    blocks: [
      {
        block_type: 2, // paragraph
        text: {
          elements: [{ text_run: { content: content } }],
          style: {}
        }
      }
    ]
  };

  const response = await axios.post(
    `${FEISHU_API_BASE}/docx/v1/documents`,
    {
      title: title,
      content: docContent
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return response.data;
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
        scan(fullPath);
      } else if (item.endsWith('.md')) {
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
    // 获取访问令牌
    const token = await getTenantAccessToken();
    console.log('获取飞书访问令牌成功');

    // 获取所有 MD 文件
    const files = scanMarkdownFiles(config.vault.wikiPath, config.vault.wikiPath);
    console.log(`找到 ${files.length} 个 MD 文件`);

    // 同步每个文件
    for (const file of files) {
      console.log(`同步: ${file.relativePath}`);

      const content = fs.readFileSync(file.fullPath, 'utf-8');

      // 解析并上传图片
      const imageRefs = parseImageRefs(content);
      const imageMap = new Map();

      for (const imageName of imageRefs) {
        const imagePath = path.join(path.dirname(file.fullPath), imageName);
        if (fs.existsSync(imagePath)) {
          try {
            const fileKey = await uploadImage(token, imagePath);
            // 这里需要获取实际的 URL，简化处理
            imageMap.set(imageName, `feishu://file/${fileKey}`);
          } catch (err) {
            console.warn(`图片上传失败: ${imageName}`, err.message);
          }
        }
      }

      // 转换内容
      const feishuContent = convertMarkdownToFeishu(content, imageMap);

      // 创建文档
      const title = file.relativePath.replace(/\\/g, '/').replace('.md', '');
      await createDocument(token, title, feishuContent, null);
    }

    console.log('飞书同步完成');
  } catch (error) {
    console.error('飞书同步失败:', error.message);
    throw error;
  }
}

// 从飞书拉取更新的文档
async function syncFromFeishu() {
  if (!config.feishu.enabled) {
    console.log('飞书同步未启用');
    return;
  }

  console.log('从飞书拉取更新...');
  // 实现从飞书拉取的逻辑
  // 需要记录上次同步的位置/时间戳
}

// 定时同步
function startSyncTimer() {
  const intervalMs = config.sync.interval * 60 * 1000;
  console.log(`同步定时器已启动，间隔: ${config.sync.interval} 分钟`);

  setInterval(async () => {
    await syncToFeishu();
    await syncFromFeishu();
  }, intervalMs);
}

// 导出
module.exports = {
  syncToFeishu,
  syncFromFeishu,
  startSyncTimer
};

// 直接运行时执行
if (require.main === module) {
  syncToFeishu().catch(console.error);
}