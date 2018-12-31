import axios from "axios";

const baseUrl = process.env.API_BASE || "";

const generateUrl = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`;
    return result;
  }, "");
  const symbol = str ? "?" : "";
  return `${baseUrl}/api${url}${symbol}${str.substring(0, str.length - 1)}`;
};

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(generateUrl(url, params))
      .then(res => {
        const data = res.data;
        if (data && data.success) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch(reject);
  });
};

export const post = (url, params, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(generateUrl(url, params), data)
      .then(res => {
        const _data = res.data;
        if (_data && _data.success) {
          resolve(_data);
        } else {
          reject(_data);
        }
      })
      .catch(reject);
  });
};
