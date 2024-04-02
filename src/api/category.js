import request from "@/utils/request";

export function getCategory(url) {
  return request({
    method: "get",
    url,
  });
}

export function addDisease(url, catagoryNode) {
  return request({
    method: "post",
    url,
    data: catagoryNode
  })
}


export function removeCate(url, data) {
    return request({
      method: "get",
      url,
      params: data
    })
  }
