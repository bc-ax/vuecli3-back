import Vue from 'vue';
import SvgIcon from './SvgIcon.vue';
Vue.component('svg-icon',SvgIcon)

/* 解析svg图标
*cnpm install svg-sprite-loader -S
*require.context 查询文件 
*1.查询的文件夹名称
*2.是否查询到子文件夹
*3.查询规则
*/
const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext)
};
requireAll(req);