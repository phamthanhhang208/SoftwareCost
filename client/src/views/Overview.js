import React from 'react'
import 'antd/dist/antd.css';
import './Overview.css';
import CardItem from '../components/CardItem';
import { Layout, Menu, Typography } from 'antd';

const { Title } = Typography;

const { Header, Content } = Layout;
  

export default function SideNavBar() {
   

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
          <Header>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal"></Menu>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Title level={2}>Công cụ xác định chi phí phần mềm</Title>
            <CardItem />
          </Content>
      </Layout>
    )
}
