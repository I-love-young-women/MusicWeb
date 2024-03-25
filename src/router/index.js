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
    // {
    //   path: '/index',
    //   component: () => import('../views/Index.vue'),
    // },
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
    {
      path: '/layout',
      components: {
        default: () => import('../views/Layout.vue'),
        layout: () => import('../views/Layout.vue')
      },
      children: [
        {
          path: '',
          components: {
            default: () => import('../views/Playing.vue'),
            layout: () => import('../views/Playing.vue')
          }
        },
        {
          path: 'play',
          components: {
            default: () => import('../views/Playing.vue'),
            layout: () => import('../views/Playing.vue')
          }
        },
        {
          path: 'recommend',
          components: {
            default: () => import('../views/Recommend.vue'),
            layout: () => import('../views/Recommend.vue')
          }
        },
        {
          path: 'search',
          components: {
            default: () => import('../views/Search.vue'),
            layout: () => import('../views/Search.vue')
          }
        },
        {
          path: 'myMusic',
          components: {
            default: () => import('../views/MyMusic.vue'),
            layout: () => import('../views/MyMusic.vue')
          }
        },
        {
          path: 'myRecent',
          components: {
            default: () => import('../views/MyRecent.vue'),
            layout: () => import('../views/MyRecent.vue')
          }
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