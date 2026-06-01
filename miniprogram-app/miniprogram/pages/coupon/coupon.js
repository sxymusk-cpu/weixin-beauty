// 栀·美研所 — 优惠券
const api = require('../../utils/api');

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
    this._load();
  },

  async _load() {
    this.setData({ loading: true });
    try {
      const list = await api.getCoupons();
      this.setData({ list });
    } catch {
    } finally {
      this.setData({ loading: false });
    }
  },

  onBack() { wx.navigateBack(); },

  onClaim() {
    wx.showToast({ title: '已领取，结账时可用', icon: 'success' });
  },
});
