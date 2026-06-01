// 栀·美研所 — 我的收藏
const api   = require('../../utils/api');
const store = require('../../utils/store');

Page({
  data: {
    navH: 0,
    statusBarH: 0,
    list: [],
    loading: true,
  },

  onLoad() {
    const sys = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    const statusBarH = sys.statusBarHeight || 44;
    this.setData({ navH: statusBarH + 44, statusBarH });
  },

  onShow() { this._load(); },

  async _load() {
    this.setData({ loading: true });
    const ids = store.getFavorites();
    if (!ids.length) {
      this.setData({ list: [], loading: false });
      return;
    }
    try {
      const all = await api.getServices();
      const list = all.filter(s => ids.includes(s._id) || ids.includes(String(s.id)));
      this.setData({ list, loading: false });
    } catch {
      this.setData({ loading: false });
    }
  },

  onRemove(e) {
    const id = e.currentTarget.dataset.id;
    store.removeFavorite(id);
    this.setData({ list: this.data.list.filter(s => (s._id || String(s.id)) !== id) });
    wx.showToast({ title: '已取消收藏', icon: 'none' });
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
  },

  onBack() { wx.navigateBack(); },
});
