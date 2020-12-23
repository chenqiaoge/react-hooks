import React from 'react';
import {
  // BrowserRouter as Router, Switch, Route, 
  Link
} from 'react-router-dom'
// import logo from './logo.svg';
import { Button, Input, Layout } from 'antd'
import './App.scss';
// import Home from './views/home'
import LayoutComponent from '@/components/common/layout'

import WrapRouter from './router'
import routes from './router/routeConfig' // 全量routes
import routesApi from './router/routesMock'

// 待做：layout转到app中！
let trueRoute = null
function App () {
  if (!trueRoute) {
    trueRoute = calcRouteList()
  }
  return (
    <div className="App">
      <LayoutComponent routes={trueRoute}>
      </LayoutComponent>
      {/* <Input placeholder="Basic usage" /> */}
      {/* <Button>test antd craco</Button> */}
    </div>
  );
}

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
function LayoutCom () {
  const { Header, Footer, Sider, Content } = Layout;
  // console.log('layout update')
  if (!trueRoute) {
    trueRoute = calcRouteList()
  }
  return (
    <Layout className="layout">
      <Sider collapsible style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>Sider
        <ul className="menus">
          {renderMenu(trueRoute)}
        </ul>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header>Header</Header>
        <Content>Content
          <WrapRouter routeList={trueRoute} />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}

export default App;
