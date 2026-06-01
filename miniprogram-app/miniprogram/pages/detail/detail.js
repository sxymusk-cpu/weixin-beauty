// 栀·美研所 — 服务详情
const api   = require('../../utils/api');
const store = require('../../utils/store');

Page({
  data: { service: {}, isFav: false },

  async onLoad(options) {
    const { id } = options;
    if (!id) return;
    const service = await api.getServiceDetail(id);
    const isFav   = store.isFavorite(id);
    this.setData({ service: service || {}, isFav });
  },

  onBack() { wx.navigateBack(); },

  onFav() {
    const id = this.data.service._id;
    if (this.data.isFav) {
      store.removeFavorite(id);
      this.setData({ isFav: false });
      wx.showToast({ title: '已取消收藏', icon: 'none' });
    } else {
      store.addFavorite(id);
      this.setData({ isFav: true });
      wx.showToast({ title: '已收藏', icon: 'success' });
    }
  },

  onBook() {
    wx.navigateTo({ url: `/pages/book/book?serviceId=${this.data.service._id}` });
  },
});
