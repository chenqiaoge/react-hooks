import Home from '../views/home'
import About from '../views/about'
import Inbox from '../views/inbox'
// 该写法，默认不能使用动态加载（import()方式）组件，
// react 动态加载可以使用npm包（react-loadable）
export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/inbox',
    component: Inbox,
    // component: () => import('../views/inbox')
  }
]