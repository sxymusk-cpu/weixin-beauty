// 栀·美研所 — 积分明细
const api = require('../../utils/api');

Page({
  data: {
    navH: 0,
    statusBarH: 0,
    balance: 0,
    logs: [],
    config: {},
    checkedToday: false,
    loading: true,
    typeMap: {
      checkin:  '签到获得',
      exchange: '兑换消费',
      manual:   '手动调整',
    },
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
      const data = await api.getPoints();
      const logs = (data.logs || []).map(l => ({
        ...l,
        date: (l.created_at || '').slice(0, 16).replace('T', ' '),
      }));
      const today = new Date().toISOString().slice(0, 10);
      const checkedToday = logs.some(l => l.type === 'checkin' && (l.created_at || '').slice(0, 10) === today);
      this.setData({ balance: data.balance || 0, config: data.config || {}, logs, checkedToday });
    } catch {
    } finally {
      this.setData({ loading: false });
    }
  },

  async onCheckin() {
    if (this.data.checkedToday) {
      wx.showToast({ title: '今天已签到', icon: 'none' });
      return;
    }
    try {
      const res = await api.checkin();
      wx.showToast({ title: res.detail || '签到成功', icon: 'success' });
      this._load();
    } catch (e) {
      const msg = e?.data?.detail || '签到失败';
      wx.showToast({ title: msg, icon: 'none' });
    }
  },

  onBack() { wx.navigateBack(); },
});
