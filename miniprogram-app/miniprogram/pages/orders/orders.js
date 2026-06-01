// 栀·美研所 — 我的预约
const api  = require('../../utils/api');
const mock = require('../../utils/mockData');

Page({
  data: {
    navH: 0,
    statusBarH: 0,
    tabs: [
      { key: '', label: '全部' },
      { key: 'pending',   label: '待确认' },
      { key: 'confirmed', label: '已确认' },
      { key: 'done',      label: '已完成' },
    ],
    activeTab: '',
    list:      [],
    statusMap: mock.STATUS_MAP,
  },

  onLoad() {
    const sys        = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    const statusBarH = sys.statusBarHeight || 44;
    const navH       = statusBarH + 44;
    this.setData({ navH, statusBarH });
    this._load();
  },

  onShow() {
    if (typeof this.getTabBar === 'function') {
      this.getTabBar().setData({ selected: 2 });
    }
    this._load();
  },

  async _load() {
    const status = this.data.activeTab;
    const list = await api.getAppointments(status ? { status } : {});
    this.setData({ list });
  },

  onTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.key });
    this._load();
  },

  async onCancel(e) {
    wx.showModal({
      title: '取消预约',
      content: '确定要取消这条预约吗？',
      confirmColor: '#B5503E',
      success: async (res) => {
        if (!res.confirm) return;
        const apptNo = e.currentTarget.dataset.apptNo;
        try {
          await api.cancelAppointment(apptNo);
          this._load();
          wx.showToast({ title: '已取消', icon: 'success' });
        } catch {
          wx.showToast({ title: '取消失败', icon: 'none' });
        }
      },
    });
  },

  goBook() {
    wx.switchTab({ url: '/pages/book/book' });
  },
});
