// 栀·美研所 — 配置示例
// 复制本文件为 config.js 并填入实际值
const config = {
  API_BASE: 'http://YOUR_SERVER_IP/api/mp',  // 备案后改为 https://你的域名/api/mp
  STORE_ID: 'YOUR_STORE_PUBLIC_ID',          // 后台「商户详情」里的小程序ID
  useMock: false,
  timeout: 10000,
  storageKey: {
    token:     '_beauty_token',
    userInfo:  '_beauty_user',
    favorites: '_beauty_favorites',
  },
};

module.exports = config;
