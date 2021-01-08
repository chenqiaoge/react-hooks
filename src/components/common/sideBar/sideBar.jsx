import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
  PieChartOutlined,
  // DesktopOutlined,
  // FileOutlined,
  // TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

import './sideBar.less'

const { SubMenu } = Menu

function renderMenu(menuLists) {
  return menuLists
    .filter((menu) => menu.auth)
    .map((item, index) => {
      if (item.childrens?.length > 0) {
        return (
          <SubMenu key={item.id} icon={<UserOutlined />} title={item.meta.label}>
            {renderMenu(item.childrens)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id} icon={<PieChartOutlined />}>
          <Link to={item.path}> {item.meta.label}</Link>
        </Menu.Item>
      )
    })
}
function SideBar({ routes }) {
  console.log(routes)
  return (
    <Menu className='customMenu' theme='light' defaultSelectedKeys={['1']} mode='inline'>
      {renderMenu(routes)}
      {/* <Menu.Item key='1' icon={<PieChartOutlined />}>
        Option 1
      </Menu.Item>
      <Menu.Item key='2' icon={<DesktopOutlined />}>
        Option 2
      </Menu.Item>
      <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
        <Menu.Item key='3'>Tom</Menu.Item>
        <Menu.Item key='4'>Bill</Menu.Item>
        <Menu.Item key='5'>Alex</Menu.Item>
      </SubMenu>
      <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
        <Menu.Item key='6'>Team 1</Menu.Item>
        <Menu.Item key='8'>Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key='9' icon={<FileOutlined />}>
        Files
      </Menu.Item> */}
    </Menu>
  )
}

export default SideBar
