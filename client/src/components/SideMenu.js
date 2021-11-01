import React from 'react'
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function SideMenu() {
    return (
        <Sider width={250} className="site-layout-background">
            <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            >
                
                <Menu.Item key="1">Yêu cầu chức năng</Menu.Item>
                <Menu.Item key="2">Trường hợp sử dụng</Menu.Item>
                <Menu.Item key="3">Điểm tác nhân</Menu.Item>
                <Menu.Item key="4">Điểm trường hợp sử dụng</Menu.Item>
                <Menu.Item key="5">Hệ số phức tạp KT-CN</Menu.Item>
                
                <SubMenu key="sub2" title="Hệ số tác động, phức tạp của môi trường">
                    <Menu.Item key="6">Hệ số phức tạp, nhóm làm việc</Menu.Item>
                    <Menu.Item key="7">Hệ số phức tạp môi trường</Menu.Item>
                </SubMenu>

                <Menu.Item key="8">Giá trị phần mềm</Menu.Item>
            </Menu>
        </Sider>
    )
}
