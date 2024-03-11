import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),//哈希模式
  routes: [
    {
      path: '/',
      component: () => import('../views/Login.vue'),
    },
    // {
    //   path: '/home',
    //   component: () => import('../views/Home.vue'),
    // },
    {
      path: '/sys',
      component: () => import('../views/Sys.vue'),
    },
    {
      path: '/index',
      component: () => import('../views/Index.vue'),
    },
    {
      path: '/layout',
      component: () => import('../views/Layout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/Playing.vue')
        },
        {
          path: 'play',
          component: () => import('../views/Playing.vue')
        },
        {
          path: 'recommend',
          component: () => import('../views/Recommend.vue')
        },
        {
          path: 'search',
          component: () => import('../views/Search.vue')
        },
        {
          path: 'myMusic',
          component: () => import('../views/MyMusic.vue')
        },
        {
          path: 'myRecent',
          component: () => import('../views/MyRecent.vue')
        },
        {
          path:'/m',
          component:()=>import('../views/Mlayout.vue')
        },
        {
          path:'/mlayout',
          component:()=>import('../views/Mlayout.vue'),
          children:[
            {
              path:'',
              redirect:"home",
              component:()=>import('../views/Home.vue')
            },
            {
              path:'userlist',
              component:()=>import('../views/UserList.vue')
            },
            {
              path:'adduser',
              component:()=>import('../views/AddUser.vue')
            },
            {
              path:'musiclist',
              component:()=>import('../views/MusicList.vue')
            },
            {
              path:'addmusic',
              component:()=>import('../views/AddMusic.vue')
            }
          ]
        },
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