import VueRouter from 'vue-router'
import Index from './Index.vue'
import SearchFiles from './components/SearchFiles.vue'
import Comment from './components/Comment.vue'

var router = new VueRouter({
    base:'/pc',
    routes: [
        {
            path: '/', component: Index,
            redirect:'/search',
            children:[
                {path:'search', component:SearchFiles}
            ],
        },
        { path: '/comment', component: Comment},

    ]
})

export default router