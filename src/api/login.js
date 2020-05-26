import service from "@/utils/request"
/**
 * 验证码
 * */
export function GetSms(data) {
	// console.log(data)
	return service.request({
		method: "post",
		url: "/getSms/",
		data: data
	})
}

/**
 * 注册按钮
 */
export function Register(data) {
	return service.request({
		method: "post",
		url: '/register/',
		data: data
	});
}

/***
 * 登陆按钮
 */
export function Login(data){
	return service.request({
		method:"post",
		url:'/login/',
		data
	})
}