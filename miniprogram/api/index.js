import request from "../utils/request.js";

function baseRequest(path, payload, method) {
  return request({
    url: `${path}`,
    method,
    data: payload
  });
}
export function getAuth(payload) {
  return baseRequest("/golf/weixin/auth", payload, "POST");
}
export function createGame(payload) {
  return baseRequest("/golf/g-game/create", payload, "POST");
}
export function getGameList(payload) {
  return baseRequest("/golf/g-game/getGGameByMNo", payload, "GET");
}
export function getGameDetail(payload) {
  return baseRequest("/golf/g-game/getGGameByGNo", payload, "GET");
}
export function getScoreInfo(payload) {
  return baseRequest("/golf/g-game-group-user-score/getScore", payload, "GET");
}
export function markScore(payload) {
  return baseRequest("/golf/g-game-group-user-score/markScore", payload, "POST");
}
