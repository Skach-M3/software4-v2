import request from "@/utils/request";

export function getRequest(url, params) {
  return request({
    method: "get",
    url,
    params
  });
}

export function postRequest(url, data) {
  return request({
    method: "post",
    url,
    data
  })
}
