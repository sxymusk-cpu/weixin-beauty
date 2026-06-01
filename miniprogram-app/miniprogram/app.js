// 栀·美研所 — 小程序入口
const config = require('./utils/config');
const http   = require('./utils/http');

App({
  onLaunch() {
    this.globalData = {
      userInfo: null,
      token: wx.getStorageSync(config.storageKey.token) || '',
      storeInfo: null,
    };
    this._loadStoreInfo();
  },

  async _loadStoreInfo() {
    try {
      const data = await http.get('/');
      this.globalData.storeInfo = data;
    } catch {
      this.globalData.storeInfo = {
        name: '栀·美研所',
        slogan: '高定护肤 · 体验式服务',
        address: '市中心 · 798 艺术区旁',
        phone: '400-888-8888',
      };
    }
  },
});
