/**
 * 定义拦截器
 */
import axios from "axios";
// const service = axios.create();
import { Message } from 'element-ui';
// 开发环境
// console.log(process.env.NODE_ENV)
// console.log(process.env.VUE_APP_ABC)

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service = axios.create({
    baseURL: BASEURL,  // http://192.168.0.106:8080/devApi/  == http://www.web-jshtml.cn/productapi/productapi
    timeout: 15000,   // 超时
    // 网络请求接口，假设 5000
    // 1000 2000，
});

// 添加请求拦截器
service.interceptors.request.use(function(config) {
	// console.log(config)
	// 在发送请求之前做些什么
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function(response) {
	// console.log(response)
	let data = response.data;
	if(data.resCode !=0){
		Message({
			message: data.message,
			type: 'warning'
		});
		return Promise.reject(data)
	}else{
		Message({
			showClose: true,
			message: data.message,
			type: 'success',
			center: true,
			duration:3000
		});
		// 对响应数据做出反应
		return response;
	}
}, function(error) {
	// 对响应错误做出反应
	return Promise.reject(error);
});

export default service;
