import React, { useState } from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell'
import { Typography } from 'antd';

const { Title } = Typography;

const columns = [
    {
        title: 'Khoản mục chi phí',
        dataIndex: 'category'
    },
    {
        title: 'Giá trị',
        dataIndex: 'result'
    },
    {
        title: 'Ký hiệu',
        dataIndex: 'symbol'
    },
]

const summaryRow = [
    {
        key: '0',
        name: 'TỔNG CỘNG',
        colSpan: 2,
        value: 0
    }
]

const initialDatas = [
    {
        key: '0',
        category: 'Giá trị phần mềm',
        result: 0,
        symbol: 'G'
    },
    {
        key: '1',
        category: 'Chi phí chung',
        result: 0,
        symbol: 'C'
    },
    {
        key: '2',
        category: 'Thu nhập chịu thuế tính trước',
        result: 0,
        symbol: 'TL'
    },
    {
        key: '3',
        category: 'Chi phí xây dựng phần mềm',
        result: 0,
        symbol: 'G'
    },
]

export default function SoftwareEstimation(){
    const [datas, setDatas] = useState(initialDatas)
    const [summaryCells,setSummaryCells] = useState(summaryRow)
    return (
        <ProjectDetailsLayout>
            <Title level={3}>Tổng hợp giá trị phần mềm</Title>
            <EditTableCell
            columns = {columns}
            dataSource={datas}
            summaryCells = {summaryCells}
            />
        </ProjectDetailsLayout>
    )
}
