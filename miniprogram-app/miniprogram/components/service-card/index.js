// 栀·美研所 — 服务卡片组件
Component({
  properties: {
    service: { type: Object, value: {} },
  },
  methods: {
    onTap() {
      const id = this.data.service._id;
      wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
    },
  },
});
