import React from 'react'
import SideMenu from '../components/SideMenu'
import Navbar from '../components/Navbar'
import 'antd/dist/antd.css';
import './ProjectDetails.css'
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;


export default function ProjectDetails() {
    return (
        <Layout>
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
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
