import React from 'react'
import SideMenu from './SideMenu'
import Navbar from './Navbar'
import 'antd/dist/antd.css';
import './ProjectDetailsLayout.css'
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

export default function ProjectDetailsLayout(props) {
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }} >
            <Navbar />
            <Layout>
               <SideMenu /> 
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Tổng quan</Breadcrumb.Item>
                        <Breadcrumb.Item>Chi tiết dự án</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        </div>
    )
}
