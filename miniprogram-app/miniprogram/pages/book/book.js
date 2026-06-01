// 栀·美研所 — 预约页
const api  = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    navH:             0,
    statusBarH:       0,
    categories:       [],
    activeCat:        'skin',
    allServices:      [],
    filteredServices: [],
    selectedService:  {},
    weekDays:         [],
    selectedDate:     '',
    timeSlots:        [],
    selectedTime:     '',
    remark:           '',
    canBook:          false,
  },

  onLoad(options) {
    const sys        = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    const statusBarH = sys.statusBarHeight || 44;
    const navH       = statusBarH + 44;
    this.setData({ navH, statusBarH });
    this._buildWeekDays();
    this._loadData();

    // 从详情页带参数进入
    if (options.serviceId) {
      this._preselectService(options.serviceId);
    }
  },

  onShow() {
    if (typeof this.getTabBar === 'function') {
      this.getTabBar().setData({ selected: 1 });
    }
  },

  async _loadData() {
    const [cats, services] = await Promise.all([
      api.getCategories(),
      api.getServices(),
    ]);
    const firstCat = cats.length ? cats[0].id : '';
    this.setData({
      categories: cats,
      activeCat: firstCat,
      allServices: services,
      filteredServices: services.filter(s => String(s.categoryId) === String(firstCat)),
    });
    this._loadSlots();
  },

  _buildWeekDays() {
    const days = util.getWeekDays();
    days[0].active = true;
    if (days[3]) days[3].full = true;
    this.setData({ weekDays: days, selectedDate: days[0].date });
  },

  async _loadSlots() {
    const slots = await api.getTimeSlots(this.data.selectedDate);
    this.setData({ timeSlots: slots });
  },

  async _preselectService(id) {
    const s = await api.getServiceDetail(id);
    if (s) {
      this.setData({
        selectedService: s,
        activeCat: s.categoryId,
        filteredServices: this.data.allServices.filter(x => x.categoryId === s.categoryId),
      });
      this._checkCanBook();
    }
  },

  onCatTap(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      activeCat: id,
      filteredServices: this.data.allServices.filter(s => String(s.categoryId) === String(id)),
    });
  },

  onServiceSelect(e) {
    const id = e.currentTarget.dataset.id;
    const service = this.data.allServices.find(s => String(s._id) === String(id));
    this.setData({ selectedService: service || {} });
    this._checkCanBook();
  },

  onDateTap(e) {
    const { index } = e.currentTarget.dataset;
    const days = this.data.weekDays.map((d, i) => ({ ...d, active: i === index }));
    this.setData({
      weekDays: days,
      selectedDate: days[index].date,
      selectedTime: '',
    });
    this._loadSlots();
    this._checkCanBook();
  },

  onSlotTap(e) {
    const { time, full } = e.currentTarget.dataset;
    if (full) return;
    this.setData({ selectedTime: time });
    this._checkCanBook();
  },

  onRemarkInput(e) {
    this.setData({ remark: e.detail.value });
  },

  _checkCanBook() {
    const { selectedService, selectedDate, selectedTime } = this.data;
    this.setData({
      canBook: !!(selectedService._id && selectedDate && selectedTime),
    });
  },

  async onSubmit() {
    if (!this.data.canBook) {
      wx.showToast({ title: '请完善预约信息', icon: 'none' });
      return;
    }
    const { selectedService, selectedDate, selectedTime, remark } = this.data;
    wx.showLoading({ title: '提交中...' });
    try {
      await api.createAppointment({
        serviceId:    selectedService._id || selectedService.id,
        apptDate:     selectedDate,
        timeSlot:     selectedTime,
        note:         remark,
      });
      wx.hideLoading();
      wx.showToast({ title: '预约成功', icon: 'success' });
      setTimeout(() => {
        wx.switchTab({ url: '/pages/orders/orders' });
      }, 1200);
    } catch {
      wx.hideLoading();
      wx.showToast({ title: '提交失败，请重试', icon: 'none' });
    }
  },
});
