import request from "../utils/request.js";

function baseRequest(path, payload, method, header = {}) {
  return request({
    url: `${path}`,
    method,
    data: payload,
    header
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
export function getMsgList(payload) {
  return baseRequest("/golf/g-message/getMessageByMNo", payload, "GET");
}
export function sendMsg(payload){
  return baseRequest("/golf/g-message/saveMessage", payload, "POST");
}
export function getAllScore(payload) {
  return baseRequest("/golf/g-game-group-user-score/getScoreList", payload, "GET");
}
export function setGameRule(payload) {
  return baseRequest("/golf/g-play/create", payload, "POST");
}
export function upload(payload,header) {
  return baseRequest("/golf/image/uploadImg", payload, "POST",header);
}