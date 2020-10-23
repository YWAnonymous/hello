import service from "@/utils/request";


/**
 * 根据 ID 查询用户信息
 */
export function getUserById(data) {
  return service.request({
    method: "get",
    url: "users/" + data,

  })
}
/**
 * 编辑用户提交
 */
export function putUserById(params) {
  return service.request({
    method: "put",
    url: "users/" + params.id,
    data:params.params
  })
}
/**
 * 编辑用户删除
 */
export function deleteUserById(params) {
  return service.request({
    method: "delete",
    url: "users/" + params,
  })
}
