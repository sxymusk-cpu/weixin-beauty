// 栀·美研所 — HTTP 封装
const config = require('./config');

function request(method, path, data = {}) {
  const token = wx.getStorageSync(config.storageKey.token) || '';
  // path 以 /beauty/ 开头 → 美业专属端点，否则 → 通用端点
  const baseUrl = `${config.API_BASE}/${config.STORE_ID}`;
  const url = baseUrl + path;

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: 'Token ' + token } : {}),
      },
      timeout: config.timeout,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: reject,
    });
  });
}

module.exports = {
  get:    (path, data) => request('GET',    path, data),
  post:   (path, data) => request('POST',   path, data),
  put:    (path, data) => request('PUT',    path, data),
  patch:  (path, data) => request('PATCH',  path, data),
  delete: (path, data) => request('DELETE', path, data),
};
