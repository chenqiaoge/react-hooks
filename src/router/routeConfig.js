// import Home from '../views/home'
// import About from '../views/about'
// import Inbox from '../views/inbox'
import { lazy } from 'react'  // 路由组件懒加载 v16.6.0+

export default [
  {
    path: '/',
    exact: true,
    pid: 0,
    id: 1,
    auth: false,
    meta: {
      label: 'homes'
    },
    // component: lazy(() => import('../views/home')),
    childrens: [
      {
        path: '/home',
        exact: true,
        pid: 1,
        id: '1-0',
        auth: false,
        meta: {
          label: 'home'
        },
        component: lazy(() => import('../views/home')),
      },
      {
        path: '/home/test',
        id: '1-1',
        auth: false,
        meta: {
          label: 'test'
        },
        component: lazy(() => import('../views/home/list'))
      },
      {
        path: '/home/antVDemo',
        id: '1-2',
        auth: false,
        meta: {
          label: 'antVDemo',
        },
        component: lazy(() => import('../views/home/dragDrop'))
      },
      {
        path: '/home/drag',
        id: '1-3',
        auth: false,
        meta: {
          label: 'dragDrop',
        },
        component: lazy(() => import('../views/home/dragDrop'))
      },
      {
        path: '/home/testAuth',
        id: '1-4',
        auth: false,
        meta: {
          label: 'testAuth',
          showMenu: false
        },
        component: lazy(() => import('../views/home/dragDrop'))
      }
    ]
  },
  {
    path: '/about',
    pid: 0,
    id: 2,
    auth: false,
    meta: {
      label: 'about'
    },
    component: lazy(() => import('../views/about'))
  },
  {
    path: '/inbox',
    pid: 0,
    id: 3,
    auth: false,
    meta: {
      label: 'inbox'
    },
    component: lazy(() => import('../views/inbox'))
  }
]