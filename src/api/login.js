import service from "@/utils/request";
/**
 * 登录
 */
export function Login(data){
    return service.request({
        method: "post",
        url: "/login/",
        data
    })
}
/**
 * 获取菜单
 */
export function getMenu(data){
    return service.request({
        method: "get",
        url: "/menus/",
        data
    })
}