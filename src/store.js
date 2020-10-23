import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


Vue.use(Vuex)
var store = new Vuex.Store({
    state: {
        base_url: "http://198.22.1.12:8080",  // 后台API接口
        //admin_url: "http://127.0.0.1:80/admin",  // 后台管理地址

        posts_lst: [],    //查询结果
        total: 0,       // 查询总数

        title: '',//查询标题
        content: '',//查询内容
        service_type: '全部', // 业务类型
        file_type: '全部',//文件类型
        scope: '全部',// 效力层级
        dept: '全部',//颁布单位
        effect_time_start: '',
        effect_time_end: '',
        pub_time_start: '',
        pub_time_end: '',

        categories_lst: [
            { id: 1, service_type: '综合管理' },
            { id: 2, service_type: '船舶管理' },
            { id: 3, service_type: '公司管理' },
            { id: 4, service_type: '船检管理' },
            { id: 5, service_type: '船员管理' },
            { id: 6, service_type: '规费征稽' },
            { id: 7, service_type: '航海保障' },
            { id: 8, service_type: '事故调查' },
            { id: 9, service_type: '通航管理' },
            { id: 10, service_type: '危防管理' },
            { id: 11, service_type: '应急搜救' },
            { id: 12, service_type: '党内法规' },
        ],
    },
    mutations: {
        search(state, page) {
            let formdata = new FormData();
            formdata.append('title', state.title);
            formdata.append('content', state.content);
            formdata.append('effect_time_start', String(state.effect_time_start));
            formdata.append('effect_time_end', String(state.effect_time_end));
            formdata.append('pub_time_start', String(state.pub_time_start));
            formdata.append('pub_time_end', String(state.pub_time_end));
            if (state.service_type == '全部') { state.service_type = '' }
            formdata.append('service_type', state.service_type);
            if (state.file_type == '全部') { state.file_type = '' }
            formdata.append('file_type', state.file_type);
            if (state.scope == '全部') { state.scope = '' }
            formdata.append('scope', state.scope);
            if (state.dept == '全部') { state.dept = '' }
            formdata.append('dept', state.dept);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递 fromdata
                }
            };
            axios.post('/criteria_query?page=' + page, formdata, config)
                .then(function (response) {
                    state.posts_lst = response.data.fileDTOS
                    state.total = response.data.all_count
                }).catch(function (error) {
                    alert(error)
                })
            /* state.title = ''
            state.content = ''
            state.service_type = '全部'
            state.file_type = '全部'
            state.scope = '全部'
            state.dept = '全部'
            state.effect_time_start = ''
            state.effect_time_end = ''
            state.pub_time_start = ''
            state.pub_time_end = '' */
        },
        getformdata(state, data) {
            state.title = data.title || ''
            state.content = data.content || ''
            state.service_type = data.service_type || ''
            state.file_type = data.file_type || ''
            state.scope = data.scope || ''
            state.dept = data.dept || ''
            state.effect_time_start = data.effect_time_start || ''
            state.effect_time_end = data.effect_time_end || ''
            state.pub_time_start = data.pub_time_start || ''
            state.pub_time_end = data.pub_time_end || ''
        },
    }
})
export default store
