// 栀·美研所 — 我的
const api   = require('../../utils/api');
const store = require('../../utils/store');
const config = require('../../utils/config');

Page({
  data: {
    navH:          0,
    statusBarH:    0,
    isLogin:       false,
    userInfo:      {},
    avatarInitial: '栀',
    stats:         { done: 0, confirmed: 0, points: 0 },
    couponCount:   0,
    storeInfo:     {},
  },

  onLoad() {
    const sys        = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    const statusBarH = sys.statusBarHeight || 44;
    const navH       = statusBarH + 44;
    this.setData({ navH, statusBarH, storeInfo: getApp().globalData.storeInfo || {} });
  },

  async onShow() {
    if (typeof this.getTabBar === 'function') {
      this.getTabBar().setData({ selected: 3 });
    }
    const token = wx.getStorageSync(config.storageKey.token) || '';
    const user  = store.getUser();
    if (token && user) {
      this.setData({
        isLogin:       true,
        userInfo:      user,
        avatarInitial: (user.nickName || user.nick_name || '栀').slice(0, 1),
      });
      this._loadStats();
    }
  },

  async _loadStats() {
    try {
      const [appts, pointsData] = await Promise.all([
        api.getAppointments(),
        api.getPoints(),
      ]);
      const list = appts || [];
      this.setData({
        stats: {
          done:      list.filter(o => o.status === 'completed').length,
          confirmed: list.filter(o => o.status === 'confirmed' || o.status === 'pending').length,
          points:    pointsData?.balance || 0,
        },
      });
    } catch { /* 保持默认值 */ }
  },

  onLogin() {
    wx.getUserProfile({
      desc: '用于完善会员信息',
      success: async (res) => {
        try {
          wx.login({
            success: async (loginRes) => {
              const result = await api.login(
                loginRes.code,
                res.userInfo.nickName,
                res.userInfo.avatarUrl,
              );
              if (result?.token) {
                wx.setStorageSync(config.storageKey.token, result.token);
                store.setUser({ ...res.userInfo, points: result.points });
                this.setData({
                  isLogin:       true,
                  userInfo:      res.userInfo,
                  avatarInitial: (res.userInfo.nickName || '栀').slice(0, 1),
                });
                this._loadStats();
              }
            },
          });
        } catch {
          wx.showToast({ title: '登录失败', icon: 'none' });
        }
      },
    });
  },

  goOrders() {
    wx.switchTab({ url: '/pages/orders/orders' });
  },

  goFavorites() {
    wx.navigateTo({ url: '/pages/favorites/favorites' });
  },

  goCoupon() {
    wx.navigateTo({ url: '/pages/coupon/coupon' });
  },

  goPoints() {
    wx.navigateTo({ url: '/pages/points/points' });
  },

  onCallStore() {
    const phone = (getApp().globalData.storeInfo || {}).phone || '400-888-8888';
    wx.makePhoneCall({ phoneNumber: phone.replace(/[^0-9]/g, '') });
  },

  onSettings() {
    if (!this.data.isLogin) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.showActionSheet({
      itemList: ['退出登录'],
      itemColor: '#C8554E',
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.removeStorageSync(config.storageKey.token);
          store.clearUser();
          this.setData({ isLogin: false, userInfo: {}, avatarInitial: '栀', stats: { done: 0, confirmed: 0, points: 0 } });
          wx.showToast({ title: '已退出登录', icon: 'success' });
        }
      },
    });
  },
});
