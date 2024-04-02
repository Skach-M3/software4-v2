import request from "@/utils/request";

export function getFetures(url,index) {
  return request({
    method: "get",
    url,
    params: {
        index: index
    }
  });
}
// export function addDisease(url, catagoryNode) {
//   return request({
//     method: "post",
//     url,
//     data: catagoryNode
//   })
// }


// export function removeCate(url, data) {
//     return request({
//       method: "get",
//       url,
//       params: data
//     })
//   }