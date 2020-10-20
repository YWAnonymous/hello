import axios from "axios";
import { Message } from "element-ui";

// 本机地址
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//axios.defaults.baseURL = 'http://localhost:8989/springboot/'

// 创建axios，赋给变量service
const service = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 15000,
  });

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  　　//NProgress.start()
  console.log(config)
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config;
});

/**
 * 请求接口后，返回数据进行拦截（响应拦截器）
 */
service.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     let data = response.data
//     // 业务需求
//     if(data.resCode !== 0) {
//         return Promise.reject(data);
//     }else{
    console.log(response);
        return response;
//         // return Promise.resolve(data);
    // }

// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
});

export default service;