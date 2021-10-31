import React, {useState} from 'react'
import 'antd/dist/antd.css';
import './Overview.css';
import CardItem from '../components/CardItem';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  
  const { Header, Sider, Content, Footer } = Layout;
  

export default function SideNavBar() {
    const [collapsed,setCollapsed] = useState(false)

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo-overview" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to='/'>Tổng quan </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    <Link to='/project-details'>Báo cáo</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <CardItem></CardItem>
          </Content>
          <Footer>footer</Footer>
        </Layout>
      </Layout>
        
    )
}
