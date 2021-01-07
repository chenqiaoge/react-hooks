import React, { useState, useEffect } from 'react'
import { Layout, Breadcrumb } from 'antd'
import SideBar from './sideBar'
import WrapRouter from '@/router'

import routes from '@/router/routeConfig' // 全量routes
import routesApi from '@/router/routesMock'
import _ from 'lodash'
import { flatChildren } from '@/utils'
import '@/App.scss'

const { Header, Content, Sider } = Layout

// calc trueRoutes
function calcRouteList() {
  console.log('renderRoute')
  const authRoutes = []
  // 扁平化authRoutes
  flatChildren(authRoutes, routesApi)

  console.log('authRoutes:', authRoutes)
  // 计算权限的routes，遍历生成route，
  // 路由扁平化处理
  let trueMenus = _.cloneDeep(routes)
  const flatRoutes = []
  matchRoutes(trueMenus)

  function matchRoutes(routesStore) {
    routesStore.forEach((routeItem) => {
      const { childrens = [], ...self } = routeItem
      // const childArr = []
      if (authRoutes.some((authItem) => routeItem.id === authItem.id)) {
        // console.log('self:', self)
        flatRoutes.push(self)
        routeItem.auth = true // 有权限的菜单
      }
      if (childrens.length > 0) {
        matchRoutes(childrens)
      }
    })
  }
  // 扁平化的route，结构化的menu
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
      <Sider
        theme='light'
        className='siderMenus'
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}>
        {/* <div className='logo' /> */}
        <SideBar routes={trueMenus} />
      </Sider>
      <Layout className='site-layout'>
        <Header theme='light' className='site-layout-background' style={{ padding: 0 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content style={{ margin: '0 16px' }}>
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
