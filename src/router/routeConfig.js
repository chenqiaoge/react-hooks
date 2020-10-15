// import Home from '../views/home'
// import About from '../views/about'
// import Inbox from '../views/inbox'
import React from 'react'
import Loadable from 'react-loadable'
// 该写法，默认不能使用懒加载（import()方式）组件，
// react 懒加载可以使用npm包（react-loadable）
function Loading () {
  return (
    <div className="Loading">
      loading...
    </div>
  )
}

export default [
  {
    path: '/',
    exact: true,
    pid: 0,
    id: 1,
    meta: {
      label: 'home'
    },
    component: Loadable({
      loader: () => import('../views/home'),
      loading: Loading
    }),
    childrens: [
      {
        path: '/home/test',
        id: '1-1',
        meta: {
          label: 'test'
        },
        component: Loadable({
          loader: () => import('../views/home/list'),
          loading: Loading
        })
      },
      {
        path: '/home/test',
        id: '1-2',
        auth: 'false',
        meta: {
          label: 'test1',
        },
        component: Loadable({
          loader: () => import('../views/home/list'),
          loading: Loading
        })
      }
    ]
  },
  {
    path: '/about',
    pid: 0,
    id: 2,
    meta: {
      label: 'about'
    },
    component: Loadable({
      loader: () => import('../views/about'),
      loading: Loading
    })
  },
  {
    path: '/inbox',
    pid: 0,
    id: 3,
    meta: {
      label: 'inbox'
    },
    // component: Inbox,
    // component: () => import('../views/inbox')
    component: Loadable({
      loader: () => import('../views/inbox'),
      loading: Loading
    })
  }
]