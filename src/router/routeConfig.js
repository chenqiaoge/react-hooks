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
    component: Loadable({
      loader: () => import('../views/home'),
      loading: Loading
    })
  },
  {
    path: '/about',
    component: Loadable({
      loader: () => import('../views/about'),
      loading: Loading
    })
  },
  {
    path: '/inbox',
    // component: Inbox,
    // component: () => import('../views/inbox')
    component: Loadable({
      loader: () => import('../views/inbox'),
      loading: Loading
    })
  }
]