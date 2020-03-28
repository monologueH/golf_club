import request from "../utils/request.js";

function baseRequest(path, payload, method) {
  return request({
    url: `${path}`,
    method,
    data: payload
  });
}
export function getPlaceList(payload) {
  return baseRequest("/golf/g-place/getPlaceList", payload, "GET");
}
export function getPlaceDetail(payload) {
  return baseRequest("/golf/g-place/getPlaceDetail", payload, "GET");
}
