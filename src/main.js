import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import VueCompositionApi from '@vue/composition-api';
import "element-ui/lib/theme-chalk/index.css";
import "./router/premat";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

/***
 * npm install cookie_js --save
 */

/***
 * vue3.0中 import Vue from "vue" = import Vur from "vue/dist/vue.runtime.common.js"
 * 要使用vue的compiler模版模式需要将vue 指向 vue/dist/vue.js
 * 在vue.config.js中配置vue的指向
*/

// 自定义全局组件
import "views/icons/index.js";

/* vue3.0 默认runtime(运行模式) 指向vue/dist/vue.runtime.common.js
* vue2 默认compiler(模版模式)
*/
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
