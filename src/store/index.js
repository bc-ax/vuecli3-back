import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";
import {Login} from "@/api/login";
Vue.use(Vuex);
import app from "./modules/app.js";
import login from "./modules/login";

export default new Vuex.Store({
  // 模块化vuex
  modules: {
    app,
    login
  }
});
