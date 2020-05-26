import router from "./index";
import {getToken,removeToken,removeUserName} from "../utils/app";

// 设置路由的白名单
const whiteRouter = ['/login'];

/**
 * to 要进入的目标
 * from 上一个页面的地址 
 * next 进入
*/

router.beforeEach((to,from,next)=>{
    if(getToken()){
        if(to.path==="/login"){
            // 删除cookie中的token
            removeToken();
            removeUserName();
            next();
        }else{
          next();  
        }
        
        console.log("存在");
    }else{
        console.log("不存在");
        /**
         * indexOf()判断是否有那个值
         * to.path 是你要进入的那个页面地址 例如 login->index
         * -1 表示whiteRouter中不存在那个值 
        */

        if(whiteRouter.indexOf(to.path) !== -1){
            next();
        }else{
            next('/login');
        }
    }
})

/**
 * 路由的流程
 * 1.先判断是否携带了token
 * 2.token不存在 进行白名单的判断
 * 3.白名单里不存在那个值 则next('/login) 
 * 4.next('/login')之后再次进行beforeEach判断
 * 5.这次白名单中有了login 则next()
 * 6.因为这次没有参数则不调用beforeEach
*/