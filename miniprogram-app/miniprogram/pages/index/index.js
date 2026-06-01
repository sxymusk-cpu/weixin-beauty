// 栀·美研所 — 首页
const api  = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    navH:        0,
    statusBarH:  0,
    navRightPad: 200,
    storeInfo:   {},
    weekDays:    [],
    hotServices: [],
    activeDate:  '',
  },

  onLoad() {
    const sysInfo    = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    const statusBarH = sysInfo.statusBarHeight || 44;
    const menuBtn    = wx.getMenuButtonBoundingClientRect();
    const navRightPad = sysInfo.windowWidth - menuBtn.left + 8;
    const navH        = statusBarH + 44;
    this.setData({ navH, statusBarH, navRightPad, storeInfo: getApp().globalData.storeInfo || {} });
    this._buildWeekDays();
    this._loadHotServices();
  },

  onShow() {
    if (typeof this.getTabBar === 'function') {
      this.getTabBar().setData({ selected: 0 });
    }
  },

  _buildWeekDays() {
    const days = util.getWeekDays();
    days[0].active = true;  // 今天默认选中
    // 模拟某些日子已满
    if (days[3]) days[3].full = true;
    this.setData({ weekDays: days, activeDate: days[0].fullDate });
  },

  async _loadHotServices() {
    const list = await api.getServices();
    // 首页展示前 6 个
    this.setData({ hotServices: list.slice(0, 6) });
  },

  onDateTap(e) {
    const { index } = e.currentTarget.dataset;
    const days = this.data.weekDays.map((d, i) => ({ ...d, active: i === index }));
    this.setData({ weekDays: days, activeDate: days[index].fullDate });
  },

  goServices(e) {
    const cat = e.currentTarget.dataset.cat || '';
    wx.navigateTo({ url: `/pages/services/services?cat=${cat}` });
  },

  goBook() {
    wx.switchTab({ url: '/pages/book/book' });
  },
});
