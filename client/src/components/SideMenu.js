import React, {useState} from 'react'
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';
import { Link, useParams, useLocation  } from 'react-router-dom';
import {UserOutlined, FundOutlined, DesktopOutlined, ControlOutlined, CalculatorOutlined, DollarCircleOutlined, UnorderedListOutlined, BulbOutlined } from '@ant-design/icons'


const { Sider } = Layout;

export default function SideMenu() {
    const {id} = useParams()
    const [collapsed,setCollapsed] = useState(false)
    const location = useLocation();


    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Sider width={250} className="site-layout-background" collapsible collapsed={collapsed} onCollapse={toggle}>
            <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key={`/project-details/${id}/software-requirement`} icon={<UnorderedListOutlined />}><Link to={`/project-details/${id}/software-requirement`}>Yêu cầu chức năng</Link></Menu.Item>
                <Menu.Item key={`/project-details/${id}/usecase-actor`} icon={<BulbOutlined />}><Link to ={`/project-details/${id}/usecase-actor`}>Trường hợp sử dụng</Link></Menu.Item>
                <Menu.Item key={`/project-details/${id}/actor-points`} icon={<UserOutlined />}><Link to= {`/project-details/${id}/actor-points`}>Điểm tác nhân</Link></Menu.Item>
                <Menu.Item key={`/project-details/${id}/usecase-points`} icon={<FundOutlined />} ><Link to= {`/project-details/${id}/usecase-points`}>Điểm trường hợp sử dụng</Link></Menu.Item>
                <Menu.Item key={`/project-details/${id}/tech-complexity`} icon={<DesktopOutlined />} ><Link to= {`/project-details/${id}/tech-complexity`}>Hệ số phức tạp KT-CN</Link></Menu.Item>
                <Menu.Item key={`/project-details/${id}/environment-points`}icon={<ControlOutlined />} ><Link to= {`/project-details/${id}/environment-points`}>Hệ số tác động, phức tạp của môi trường và nhóm làm việc</Link></Menu.Item>
                <Menu.Item key={`/project-details/${id}/software-cost`} icon={<CalculatorOutlined />} ><Link to= {`/project-details/${id}/software-cost`}>Giá trị phần mềm</Link></Menu.Item>
                <Menu.Item key={`/project-details/${id}/software-estimate`} icon={<DollarCircleOutlined />}><Link to= {`/project-details/${id}/software-estimate`}>Chi phí phần mềm</Link></Menu.Item>
            </Menu>
        </Sider>
    )
}
