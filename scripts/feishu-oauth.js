/**
 * 飞书 OAuth 用户授权脚本
 *
 * 功能：获取用户 Access Token（用于写入文档）
 *
 * 使用：node feishu-oauth.js
 */

const axios = require('axios');
const http = require('http');
const config = require('./config');
const fs = require('fs');
const path = require('path');

const FEISHU_API_BASE = 'https://open.feishu.cn/open-apis';

// 读取保存的 token
function loadUserToken() {
  const tokenFile = path.join(__dirname, 'feishu-user-token.json');
  if (fs.existsSync(tokenFile)) {
    const data = JSON.parse(fs.readFileSync(tokenFile, 'utf-8'));
    if (data.expires_at > Date.now()) {
      return data;
    }
  }
  return null;
}

// 保存用户 token
function saveUserToken(tokenData) {
  const tokenFile = path.join(__dirname, 'feishu-user-token.json');
  fs.writeFileSync(tokenFile, JSON.stringify(tokenData, null, 2));
  console.log('✓ Token 已保存到 feishu-user-token.json');
}

// 生成授权 URL
function getAuthUrl() {
  const redirectUri = encodeURIComponent('http://localhost:3000/callback');
  const scope = 'docx:document docs:document.content:read docs:document.media:upload';
  const state = Math.random().toString(36).substring(7);

  return `https://open.feishu.cn/open-apis/authen/v1/authorize?app_id=${config.feishu.appId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
}

// 启动本地服务器等待回调
function startCallbackServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, 'http://localhost:3000');

      if (url.pathname === '/callback') {
        const code = url.searchParams.get('code');

        if (code) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end('<html><body><h1>授权成功！</h1><p>可以关闭此窗口了。</p><script>window.close();</script></body></html>');

          server.close();
          resolve(code);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end('<html><body><h1>授权失败</h1></body></html>');
          server.close();
          process.exit(1);
        }
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    server.listen(3000, () => {
      console.log('等待飞书授权回调...');
    });
  });
}

// 用 code 交换 token
async function exchangeCodeForToken(code) {
  const res = await axios.post(
    `${FEISHU_API_BASE}/authen/v1/oidc/access_token`,
    {
      grant_type: 'authorization_code',
      code: code,
      app_id: config.feishu.appId,
      app_secret: config.feishu.appSecret
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );

  return {
    access_token: res.data.data.access_token,
    refresh_token: res.data.data.refresh_token,
    expires_in: res.data.data.expires_in,
    expires_at: Date.now() + res.data.data.expires_in * 1000
  };
}

// 主流程
async function main() {
  // 检查是否已有有效 token
  const existingToken = loadUserToken();
  if (existingToken) {
    console.log('✓ 已有效的用户 Token');
    console.log('  Access Token:', existingToken.access_token.substring(0, 20) + '...');
    console.log('  过期时间:', new Date(existingToken.expires_at).toLocaleString());
    return;
  }

  console.log('=== 飞书用户授权 ===\n');

  // 生成授权 URL
  const authUrl = getAuthUrl();
  console.log('请在浏览器中打开以下链接进行授权：\n');
  console.log(authUrl);
  console.log();

  // 打开浏览器
  const { exec } = require('child_process');
  if (process.platform === 'win32') {
    exec(`start ${authUrl}`);
  } else if (process.platform === 'darwin') {
    exec(`open "${authUrl}"`);
  }

  // 等待回调
  const code = await startCallbackServer();
  console.log('\n✓ 收到授权码，正在获取 Token...');

  // 交换 token
  const tokenData = await exchangeCodeForToken(code);
  saveUserToken(tokenData);

  console.log('\n✓ 用户授权完成！');
  console.log('  Access Token:', tokenData.access_token.substring(0, 20) + '...');
  console.log('  Refresh Token:', tokenData.refresh_token.substring(0, 20) + '...');
  console.log('  过期时间:', new Date(tokenData.expires_at).toLocaleString());
}

main().catch(console.error);