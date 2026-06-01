// 栀·美研所 — 自定义 TabBar
const makeIcon = (path, color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

const ICONS = {
  home:     '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  list:     '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  user:     '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
};

const INACTIVE = '#9D98B0';
const ACTIVE   = '#5A3F8A';

Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/index/index',    text: '首页', iconPath: makeIcon(ICONS.home,     INACTIVE), selectedIconPath: makeIcon(ICONS.home,     ACTIVE) },
      { pagePath: '/pages/book/book',      text: '预约', iconPath: makeIcon(ICONS.calendar, INACTIVE), selectedIconPath: makeIcon(ICONS.calendar, ACTIVE) },
      { pagePath: '/pages/orders/orders',  text: '订单', iconPath: makeIcon(ICONS.list,     INACTIVE), selectedIconPath: makeIcon(ICONS.list,     ACTIVE) },
      { pagePath: '/pages/profile/profile',text: '我的', iconPath: makeIcon(ICONS.user,     INACTIVE), selectedIconPath: makeIcon(ICONS.user,     ACTIVE) },
    ],
  },
  methods: {
    switchTab(e) {
      const item = this.data.list[e.currentTarget.dataset.index];
      wx.switchTab({ url: item.pagePath });
    },
  },
});
