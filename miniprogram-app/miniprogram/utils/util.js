// 栀·美研所 — 通用工具函数

// 格式化日期 → "5月23日 周二"
function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  const month = d.getMonth() + 1;
  const day   = d.getDate();
  const weeks = ['周日','周一','周二','周三','周四','周五','周六'];
  const week  = weeks[d.getDay()];
  return `${month}月${day}日 ${week}`;
}

// 格式化时间 → "14:30"
function formatTime(date) {
  const d = date instanceof Date ? date : new Date(date);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

// 生成本周 7 天数组
function getWeekDays() {
  const days = [];
  const now  = new Date();
  const weeks = ['周日','周一','周二','周三','周四','周五','周六'];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push({
      label:    weeks[d.getDay()],
      date:     `${d.getMonth() + 1}-${String(d.getDate()).padStart(2, '0')}`,
      fullDate: d.toISOString().split('T')[0],
      isToday:  i === 0,
    });
  }
  return days;
}

// 防抖
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 截断文字
function ellipsis(str, len) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '…' : str;
}

module.exports = { formatDate, formatTime, getWeekDays, debounce, ellipsis };
