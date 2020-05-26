import { Login } from "@/api/login";
import { setToken, setUserName, getUserName, removeToken, removeUserName } from "@/utils/app";
// import cookie from "cookie_js";
// 保存在Vuex状态中
const state = {
    // index页的展开按钮状态
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false
    to_ken: '',
    username: getUserName() || ''
    // username:cookie.get('username') || ''

}

const getters = {
    isCollapse: state => state.isCollapse,
    username: state => state.username
}

const mutations = {
    SET_Collapse(state) {
        state.isCollapse = !state.isCollapse;
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
        // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_token(state, value) {
        state.to_ken = value;
    },
    SET_username(state, value) {
        state.username = value;
    }
}

const actions = {
    login({ commit }, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then((response) => {
                let data = response.data.data;
                commit('SET_token', data.token);
                commit('SET_username', data.username);
                setToken(data.token);
                setUserName(data.username);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    exit(){
        return new Promise((resolve, reject) => {
            console.log("www")
            removeToken();
            removeUserName();
            resolve()
        })
    }
}
const app = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};