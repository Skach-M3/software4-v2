import request from "@/utils/request";

export function getRequest(url, paramObj) {
  return request({
    method: "get",
    url,
    params: paramObj
  });
}

export function postRequest(url, data) {
  return request({
    method: "post",
    url,
    data
  })
}
