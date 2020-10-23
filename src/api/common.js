import service from "@/utils/request";
/**
 * 请求表格数据
 */
export function loadTableData(params){
    return service.request({
        method: params.method,
        url: params.url,
        params: params.data || {}
    })
}