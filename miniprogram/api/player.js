import request from "../utils/request.js";

function baseRequest(path, payload, method) {
  return request({
    url: `${path}`,
    method,
    data: payload
  });
}
export function getPlayerList(payload) {
  return baseRequest("/golf/g-wx-user/getUserList", payload, "get");
}
export function getUserDetail(payload) {
  return baseRequest("/golf/g-wx-user/getGWxUserByMNo", payload, "get");
}
