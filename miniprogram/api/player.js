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
export function getTeamInfo(payload) {
  return baseRequest("/golf/g-team/getGTeamDetail", payload, "get");
}
export function getTeamUser(payload) {
  return baseRequest("/golf/g-team-user/getGTeamUserList", payload, "get");
}