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
export function editUserDetail(payload) {
  return baseRequest('/golf/g-wx-user/saveGWxUserByMNo', payload, "post");
}
export function getTeamInfo(payload) {
  return baseRequest("/golf/g-team/getGTeamDetail", payload, "get");
}
export function getTeamUser(payload) {
  return baseRequest("/golf/g-team-user/getGTeamUserList", payload, "get");
}
export function getMemberDetails(payload) {
  return baseRequest("/golf/g-wx-user/getUserPublicInfo", payload, "get");
}