import request from "@/utils/request";

export function getTableDes(url,id) {
  return request({
    method: "get",
    url,
    params: {
        id: id
    }
  });
}

export function getTableData(url,tableId,tableName) {
    return request({
      method: "get",
      url,
      params: {
          tableId: tableId,
          tableName: tableName
      }
    });
  }

  export function getFielterData(url,addDataForm,nodeDta) {
    return request({
      method: "get",
      url,
      params: {
        addDataForm: addDataForm,
        nodeDta: nodeDta
      }
    });
  }