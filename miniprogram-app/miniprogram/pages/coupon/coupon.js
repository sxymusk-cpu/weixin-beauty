// 栀·美研所 — 优惠券
const api = require('../../utils/api');

Page({
  data: {
    navH: 0,
    statusBarH: 0,
    mode: 'claim',          // claim=领券广场  mine=我的券
    templates: [],          // 可领取模板
    myList: [],             // 我的券
    myTab: 'available',     // available/used/expired
    counts: { available: 0, used: 0, expired: 0 },
    claimedIds: [],         // 已领取的模板 id（本地标记按钮态）
    loading: true,
  },

  onLoad() {
    const sys = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    const statusBarH = sys.statusBarHeight || 44;
    this.setData({ navH: statusBarH + 44, statusBarH });
    this._loadTemplates();
  },

  onSwitchMode(e) {
    const mode = e.currentTarget.dataset.mode;
    if (mode === this.data.mode) return;
    this.setData({ mode });
    if (mode === 'mine') this._loadMine();
    else this._loadTemplates();
  },

  async _loadTemplates() {
    this.setData({ loading: true });
    try {
      const templates = await api.getCoupons();
      this.setData({ templates });
    } catch {} finally {
      this.setData({ loading: false });
    }
  },

  async _loadMine() {
    this.setData({ loading: true });
    try {
      const { list, counts } = await api.getMyCoupons(this.data.myTab);
      this.setData({ myList: list, counts });
    } catch {} finally {
      this.setData({ loading: false });
    }
  },

  onMyTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.myTab) return;
    this.setData({ myTab: tab }, () => this._loadMine());
  },

  async onClaim(e) {
    const id = e.currentTarget.dataset.id;
    const token = wx.getStorageSync('_beauty_token');
    if (!token) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    try {
      await api.claimCoupon(id);
      wx.showToast({ title: '领取成功', icon: 'success' });
      this.setData({ claimedIds: [...this.data.claimedIds, id] });
    } catch (err) {
      const msg = err?.data?.detail || '领取失败';
      wx.showToast({ title: msg, icon: 'none' });
    }
  },

  onBack() { wx.navigateBack(); },
});
