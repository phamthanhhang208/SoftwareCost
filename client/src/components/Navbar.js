import React from 'react'
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
export default function Navbar() {
    return (
        <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1" ><Link to='/'>Tổng quan</Link></Menu.Item>
            <Menu.Item key="2" ><Link to='/project-details'>Báo cáo</Link></Menu.Item>
        </Menu>
        </Header>
    )
}
