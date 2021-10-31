import React from 'react'
import 'antd/dist/antd.css';
import './CardItem.css';
import { Card, Col, Row, Button } from 'antd';


export default function CardItem() {
    return (
    <>
    <div className="site-card-wrapper">
        <Row gutter={16}>
        <Col span={8}>
            <Card title="Dự án #1" bordered={false}>
            <p>Card content</p>
            <Button type="primary">Xem chi tiết</Button>
            </Card>
        </Col>
        <Col span={8}>
            <Card title="Dự án #2" bordered={false}>
            <p>Card content</p>
            <Button type="primary">Xem chi tiết</Button>
            </Card>
        </Col>
        <Col span={8}>
            <Card title="Dự án #3" bordered={false}>
            <p>Card content</p>
            <Button type="primary">Xem chi tiết</Button>
            </Card>
        </Col>
        </Row>
    </div>
    <div className="site-card-wrapper">
        <Row gutter={16}>
            <Col span={8}>
                <Card title="Tạo dự án" bordered={false}>
                <p>Card content</p>
                <Button type="primary">Tạo mới</Button>
                </Card>
            </Col>
        </Row>
        </div>
    </>
    )
}
