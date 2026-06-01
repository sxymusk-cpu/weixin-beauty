// 栀·美研所 — 全部项目
const api = require('../../utils/api');

Page({
  data: { categories: [], activeCat: '', list: [], all: [] },

  async onLoad(options) {
    const [cats, services] = await Promise.all([
      api.getCategories(), api.getServices(),
    ]);
    const cat = options.cat || '';
    this.setData({
      categories: cats,
      all: services,
      activeCat: cat,
      list: cat ? services.filter(s => s.categoryId === cat) : services,
    });
  },

  onCat(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      activeCat: id,
      list: id ? this.data.all.filter(s => s.categoryId === id) : this.data.all,
    });
  },
});
