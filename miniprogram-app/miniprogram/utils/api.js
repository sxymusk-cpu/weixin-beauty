// 栀·美研所 — API 层（联网调用，失败降级到 mockData）
const http = require('./http');
const mock = require('./mockData');

// ── 美业专属端点前缀 ──────────────────────────────────────
const B = '/beauty';

// ── 登录 ──────────────────────────────────────────────────
async function login(code, nickName, avatarUrl) {
  try {
    return await http.post('/login/', { code, nickName, avatarUrl });
  } catch {
    return null;
  }
}

// ── 当前用户信息 ───────────────────────────────────────────
async function getMe() {
  try {
    return await http.get('/me/');
  } catch {
    return null;
  }
}

// ── 服务分类 ──────────────────────────────────────────────
async function getCategories() {
  try {
    const data = await http.get(`${B}/categories/`);
    return Array.isArray(data) ? data : mock.CATEGORIES;
  } catch {
    return mock.CATEGORIES;
  }
}

// ── 服务列表 ──────────────────────────────────────────────
async function getServices(params = {}) {
  try {
    const data = await http.get(`${B}/services/`, params);
    return data.data || data.results || mock.SERVICES;
  } catch {
    let list = mock.SERVICES;
    if (params.category) list = list.filter(s => s.categoryId === params.category);
    return list;
  }
}

// ── 服务详情 ──────────────────────────────────────────────
async function getServiceDetail(id) {
  try {
    return await http.get(`${B}/services/${id}/`);
  } catch {
    return mock.SERVICES.find(s => s._id === String(id)) || null;
  }
}

// ── 推荐服务 ──────────────────────────────────────────────
async function getFeaturedServices() {
  try {
    const data = await http.get(`${B}/services/`, { featured: 'true', page_size: 6 });
    return data.data || mock.SERVICES.slice(0, 6);
  } catch {
    return mock.SERVICES.slice(0, 6);
  }
}

// ── 美容师列表 ────────────────────────────────────────────
async function getStylists() {
  try {
    const data = await http.get(`${B}/stylists/`);
    return data.data || data || [];
  } catch {
    return [];
  }
}

// ── 可预约时段 ────────────────────────────────────────────
async function getTimeSlots(date) {
  try {
    const data = await http.get(`${B}/timeslots/`, { date });
    return data.data || mock.TIME_SLOTS.map(t => ({ label: t, available: true }));
  } catch {
    return mock.TIME_SLOTS.map(t => ({ label: t, available: true }));
  }
}

// ── 创建预约 ──────────────────────────────────────────────
async function createAppointment(payload) {
  try {
    return await http.post(`${B}/appointments/`, payload);
  } catch (e) {
    throw e;
  }
}

// ── 预约列表 ──────────────────────────────────────────────
async function getAppointments(params = {}) {
  try {
    const data = await http.get(`${B}/appointments/`, params);
    return data.data || mock.MOCK_ORDERS;
  } catch {
    return mock.MOCK_ORDERS;
  }
}

// ── 取消预约 ──────────────────────────────────────────────
async function cancelAppointment(apptNo) {
  try {
    return await http.post(`${B}/appointments/${apptNo}/cancel/`);
  } catch (e) {
    throw e;
  }
}

// ── 积分 ──────────────────────────────────────────────────
async function getPoints() {
  try {
    return await http.get('/points/');
  } catch {
    return { balance: 0, config: {}, logs: [] };
  }
}

async function checkin() {
  return await http.post('/points/checkin/');
}

// ── 优惠券 ────────────────────────────────────────────────
async function getCoupons() {
  try {
    const data = await http.get('/coupons/');
    return data.data || [];
  } catch {
    return [];
  }
}

async function claimCoupon(templateId) {
  return await http.post(`/coupons/${templateId}/claim/`);
}

async function getMyCoupons(status) {
  try {
    const data = await http.get('/my-coupons/', status ? { status } : {});
    return { list: data.data || [], counts: data.counts || {} };
  } catch {
    return { list: [], counts: {} };
  }
}

module.exports = {
  login, getMe,
  getCategories, getServices, getServiceDetail, getFeaturedServices,
  getStylists, getTimeSlots,
  createAppointment, getAppointments, cancelAppointment,
  getPoints, checkin, getCoupons, claimCoupon, getMyCoupons,
};
