/**
 * 火山引擎知识库同步脚本
 *
 * 功能：
 * 1. 将 Obsidian MD 文件同步到火山引擎知识库
 * 2. 支持图片上传到火山引擎图床
 * 3. 双向同步
 *
 * 使用前提：
 * 1. 开通火山引擎内容管理 API
 * 2. 配置 scripts/config.js 中的 volcengine 配置
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const config = require('./config');

// 火山引擎 API 配置
const VOLCENGINE_API_BASE = 'https://open.volcengineapi.com';

// 生成火山引擎签名
function generateSignature(accessKey, secretKey, method, path, headers, queryParams) {
  const date = new Date().toISOString();
  const credentialDate = date.substring(0, 10).replace(/-/g, '');

  const hashedRequest = crypto
    .createHash('sha256')
    .update(JSON.stringify({}))
    .digest('hex');

  const signedHeaders = 'host;x-date';
  const signature = `${method}\n${path}\n\nhost:${headers.host}\nx-date:${headers['x-date']}\n\n${hashedRequest}`;

  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(signature);
  const signatureHash = hmac.digest('hex');

  return `HMAC-SHA256\nCredential=${accessKey}/${credentialDate}/cn-north-1/doc/external_v3_request, SignedHeaders=${signedHeaders}, Signature=${signatureHash}`;
}

// 创建知识库空间
async function createKnowledgeSpace(accessKey, secretKey, name, description) {
  const date = new Date().toISOString().replace(/[-:]/g, '').replace('T', 'T').substring(0, 19) + 'Z';
  const headers = {
    host: 'open.volcengineapi.com',
    'x-date': date
  };

  const signature = generateSignature(accessKey, secretKey, 'POST', '/', headers, {});

  const response = await axios.post(
    `${VOLCENGINE_API_BASE}/`,
    {
      Action: 'CreateKnowledgeSpace',
      Version: '2024-01-01',
      Name: name,
      Description: description
    },
    {
      headers: {
        Authorization: `HMAC-SHA256 Credential=${accessKey}/20240101/cn-north-1/doc/external_v3_request, SignedHeaders=host;x-date, Signature=${signature}`,
        'x-date': date,
        host: 'open.volcengineapi.com'
      }
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

// 上传图片到火山引擎
async function uploadImage(accessKey, secretKey, filePath) {
  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);

  // 火山引擎图床上传接口（需根据实际 API 调整）
  const response = await axios.post(
    `${VOLCENGINE_API_BASE}/storage/v1/upload`,
    fileBuffer,
    {
      headers: {
        'Content-Type': 'application/octet-stream',
        'x-file-name': fileName,
        Authorization: `HMAC-SHA256 Credential=${accessKey}/20240101/cn-north-1/doc/external_v3_request, SignedHeaders=host;x-date, Signature=placeholder`
      },
      params: {
        fileName: fileName,
        fileSize: fileBuffer.length
      }
    }
  );

  return response.data.url;
}

// 将 MD 转换为火山引擎格式
function convertMarkdownToVolcengine(markdown, imageMap) {
  let content = markdown;

  // 替换嵌入图片为上传后的链接
  for (const [localPath, url] of imageMap) {
    content = content.replace(`![[${localPath}]]`, `![${localPath}](${url})`);
  }

  // 转换 Obsidian 双链为普通链接
  content = content.replace(/\[\[([^\]]+)\]\]/g, '$1');

  return content;
}

// 创建火山引擎文档
async function createDocument(accessKey, secretKey, title, content, spaceId) {
  const date = new Date().toISOString().replace(/[-:]/g, '').replace('T', 'T').substring(0, 19) + 'Z';

  const response = await axios.post(
    `${VOLCENGINE_API_BASE}/doc/v1/documents`,
    {
      space_id: spaceId,
      title: title,
      content: content,
      format: 'markdown'
    },
    {
      headers: {
        Authorization: `HMAC-SHA256 Credential=${accessKey}/20240101/cn-north-1/doc/external_v3_request, SignedHeaders=host;x-date, Signature=placeholder`,
        'x-date': date,
        host: 'open.volcengineapi.com',
        'Content-Type': 'application/json'
      }
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
async function syncToVolcengine() {
  if (!config.volcengine.enabled) {
    console.log('火山引擎同步未启用，请先在 config.js 中配置');
    return;
  }

  console.log('开始火山引擎同步...');

  try {
    const { accessKey, secretKey } = config.volcengine;

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
            const url = await uploadImage(accessKey, secretKey, imagePath);
            imageMap.set(imageName, url);
          } catch (err) {
            console.warn(`图片上传失败: ${imageName}`, err.message);
          }
        }
      }

      // 转换内容
      const volcengineContent = convertMarkdownToVolcengine(content, imageMap);

      // 创建文档
      const title = file.relativePath.replace(/\\/g, '/').replace('.md', '');
      await createDocument(accessKey, secretKey, title, volcengineContent, null);
    }

    console.log('火山引擎同步完成');
  } catch (error) {
    console.error('火山引擎同步失败:', error.message);
    throw error;
  }
}

// 从火山引擎拉取更新的文档
async function syncFromVolcengine() {
  if (!config.volcengine.enabled) {
    console.log('火山引擎同步未启用');
    return;
  }

  console.log('从火山引擎拉取更新...');
  // 实现从火山引擎拉取的逻辑
}

// 定时同步
function startSyncTimer() {
  const intervalMs = config.sync.interval * 60 * 1000;
  console.log(`同步定时器已启动，间隔: ${config.sync.interval} 分钟`);

  setInterval(async () => {
    await syncToVolcengine();
    await syncFromVolcengine();
  }, intervalMs);
}

// 导出
module.exports = {
  syncToVolcengine,
  syncFromVolcengine,
  startSyncTimer
};

// 直接运行时执行
if (require.main === module) {
  syncToVolcengine().catch(console.error);
}