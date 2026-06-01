// 栀·美研所 — 本地存储封装
const config = require('./config');

const store = {
  // Token
  getToken()       { return wx.getStorageSync(config.storageKey.token) || ''; },
  setToken(v)      { wx.setStorageSync(config.storageKey.token, v); },
  clearToken()     { wx.removeStorageSync(config.storageKey.token); },

  // UserInfo
  getUser()        { return wx.getStorageSync(config.storageKey.userInfo) || null; },
  setUser(v)       { wx.setStorageSync(config.storageKey.userInfo, v); },
  clearUser()      { wx.removeStorageSync(config.storageKey.userInfo); },

  // Favorites (收藏服务 ID 列表)
  getFavorites()   { return wx.getStorageSync(config.storageKey.favorites) || []; },
  addFavorite(id)  {
    const list = this.getFavorites();
    if (!list.includes(id)) { list.push(id); wx.setStorageSync(config.storageKey.favorites, list); }
  },
  removeFavorite(id) {
    const list = this.getFavorites().filter(x => x !== id);
    wx.setStorageSync(config.storageKey.favorites, list);
  },
  isFavorite(id)   { return this.getFavorites().includes(id); },
};

module.exports = store;
