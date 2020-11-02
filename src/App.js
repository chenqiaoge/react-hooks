import React from 'react';
import {
  // BrowserRouter as Router, Switch, Route, 
  Link
} from 'react-router-dom'
// import logo from './logo.svg';
import { Button, Input } from 'antd'
import './App.scss';
// import Home from './views/home'
import WrapRouter from './router'
import routes from './router/routeConfig' // 全量routes
import routesApi from './router/routesMock'

function App () {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Layout />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Input placeholder="Basic usage" />
        <Button>test antd craco</Button>
      </header>
    </div>
  );
}

// function About () {
//   return (
//     <div className="About">
//       about
//     </div>
//   )
// }
// function Inbox () {
//   return (
//     <div className="Inbox">
//       Inbox
//     </div>
//   )
// }

// renderRoute
function calcRouteList () {
  console.log('renderRoute')
  const routesIdArr = routesApi.map((item) => item.id)
  console.log('routesIdArr:', routesIdArr)
  // 计算权限的routes，遍历生成route，
  // 进行扁平化处理
  const flatRoutes = []
  routes.filter(({ id }) => routesIdArr.includes(id)).forEach(routeItem => {
    const { childrens = [], ...self } = routeItem
    const childArr = []
    childrens.forEach(child => {
      if (child.auth === 'false') {
        // 子集菜单模块的细分权限路由，待完善
        return
      }
      childArr.push(child)
    });
    flatRoutes.push(self, ...childArr)
  });
  return flatRoutes
}
function renderMenu (menuLists) {
  return menuLists.map((item, index) => {
    return (
      <li key={index}><Link to={item.path} > {item.meta.label}</Link></li>
    )
  })
}
let trueRoute = null
function Layout () {
  // console.log('layout update')
  if (!trueRoute) {
    trueRoute = calcRouteList()
  }
  return (
    <div className="layout">

      {/* <Router> */}
      <ul className="menus">
        {/* <li><Link to="/login">login</Link></li>
        <li><Link to="/">home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/inbox">Inbox</Link></li> */}
        {renderMenu(trueRoute)}
      </ul>
      <WrapRouter routeList={trueRoute} />
      {/* <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/inbox" component={Inbox} />
        </Switch> */}
      {/* <WrapRouter /> */}
      {/* </Router> */}
    </div>
  )
}

export default App;
