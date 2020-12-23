import React, { useState, useEffect } from 'react'
import { Layout, Breadcrumb } from 'antd'
import SideBar from './sideBar'
import WrapRouter from '@/router'

import routes from '@/router/routeConfig' // 全量routes
import routesApi from '@/router/routesMock'
import '@/App.scss'

const { Header, Content, Footer, Sider } = Layout

// calc trueRoutes
function calcRouteList() {
  console.log('renderRoute')
  // 扁平化apiId
  const routesIdArr = routesApi.map((item) => item.id)
  console.log('routesIdArr:', routesIdArr)
  // 计算权限的routes，遍历生成route，
  // 路由扁平化处理
  let trueMenus = routes
  const flatRoutes = []
  matchRoutes(trueMenus)

  function matchRoutes(routesStore) {
    routesStore.forEach((routeItem) => {
      const { childrens = [], ...self } = routeItem
      // const childArr = []
      if (routesIdArr.some((id) => routeItem.id === id)) {
        console.log('self:', self)
        flatRoutes.push(self)
        routeItem.auth = true
      }
      if (childrens.length > 0) {
        matchRoutes(childrens)
      }
    })
  }
  return {
    flatRoutes,
    trueMenus,
  }
}

function LayoutComponent(props) {
  const [collapsed, setCollapsed] = useState(false)
  const [trueRoute, setTrueRoute] = useState([])
  const [trueMenus, setTrueMenus] = useState([])

  const onCollapse = (collapsed) => {
    console.log(collapsed)
    setCollapsed(collapsed)
  }

  useEffect(() => {
    console.log('layout props:', props)
    const { flatRoutes: trueRoute, trueMenus } = calcRouteList()
    setTrueRoute(trueRoute)
    setTrueMenus(trueMenus)
  }, [props])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className='siderMenus' collapsible collapsed={collapsed} onCollapse={onCollapse}>
        {/* <div className='logo' /> */}
        <SideBar routes={trueMenus} />
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
            <div>content</div>
            <WrapRouter name='content' routeList={trueRoute} />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  )
}

export default React.memo(LayoutComponent)
