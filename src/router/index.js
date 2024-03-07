import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),//哈希模式
    routes: [
        {
            path:'/',
                      component:()=>import('../views/Index.vue'),
        },
        {
            path:'/layout',
            component:()=>import('../views/Layout.vue'),
            children:[
              {
                path:'',
                component:()=>import('../views/Playing.vue')
              },
              {
                path:'play',
                component:()=>import('../views/Playing.vue')
              },
              {
                path:'recommend',
                component:()=>import('../views/Recommend.vue')
              },
              {
                path:'search',
                component:()=>import('../views/Search.vue')
              },
              {
                path:'myMusic',
                component:()=>import('../views/MyMusic.vue')
              },
              {
                path:'myRecent',
                component:()=>import('../views/MyRecent.vue')
              }
            ]
        },
        // {
        //     path:'/usersheet',
        //     component:()=>import('../CloudMusic/UserSheet.vue'),
        // },
        // {
        //     path:'/song',
        //     component:()=>import('../CloudMusic/Songdetail.vue'),
        // },
    ]
})