// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'index', //命名路由
    component : () => import('@/layout/index.vue'),
    meta: {
      title: '',
      hidden: true
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home', //命名路由
        component : () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/data',
    name: 'data', //命名路由
    component : () => import('@/views/data/index.vue'),
    meta: {
      title: '数据大屏',
      hidden: true
    }
  },
  {
    path: '/acl',
    name: 'acl', //命名路由
    component : () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      hidden: true
    },
    redirect : '/acl/user',
    children: [
      {
        path: '/acl/user',
        name: 'user', //命名路由
        component : () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          hidden: true
        }
      },
      {
        path: '/acl/role',
        name: 'role', //命名路由
        component : () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          hidden: true
        }
      },
      {
        path: '/acl/menu',
        name: 'menu', //命名路由
        component : () => import('@/views/acl/menu/index.vue'),
        meta: {
          title: '菜单管理',
          hidden: true
        }
      },
      
    ]
  },
  {
    path: '/goods',
    name: 'goods', //命名路由
    component : () => import('@/layout/index.vue'),
    meta: {
      title: '商品管理',
      hidden: true
    },
    redirect: '/goods/kids',
    children: [
      {
        path: '/goods/kids',
        name: 'kids', //命名路由
        component : () => import('@/views/goods/kids/index.vue'),
        meta: {
          title: '品牌管理',
          hidden: true
        }
      },
      {
        path: '/goods/atru',
        name: 'atru', //命名路由
        component : () => import('@/views/goods/atru/index.vue'),
        meta: {
          title: '属性管理',
          hidden: true
        }
      },
     
      {
        path: '/goods/sku',
        name: 'sku', //命名路由
        component : () => import('@/views/goods/sku/index.vue'),
        meta: {
          title: 'sku管理',
          hidden: true
        }
      },
      {
        path: '/goods/spu',
        name: 'spu', //命名路由
        component : () => import('@/views/goods/spu/index.vue'),
        meta: {
          title: 'spu管理',
          hidden: true
        }
      },
      
     
    ]
  },
  {
    path: '/login',
    name: 'login', //命名路由
    component : () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: false
    }
  },
 
  {
    path: '/404',
    name: '404', //命名路由
    component : () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: false
    }
  }, {
    path: '/:pathMatch(.*)*',
    name: 'any', //命名路由
    redirect:'/404',
    meta: {
      title: '任意路由',
      hidden: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router