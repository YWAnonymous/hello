import service from "@/utils/request";


/**
 * 获取用户list
 */
export function GetUserList(data){
    return service.request({
        method: "get",
        url: "/users/",
        params:data
    })
}