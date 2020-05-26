const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
    // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false
}

const getters = {
    isCollapse:state=>state.isCollapse
}

const mutations = {
    SET_Collapse(state) {
        console.log('app')
        state.isCollapse = !state.isCollapse;
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
        // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
    }
}

const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
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