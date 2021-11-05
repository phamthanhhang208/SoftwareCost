import React, { useContext, useState, useEffect } from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell'
import TableDataContext from '../context/tableData-context';
import { Typography } from 'antd';

const { Title } = Typography;

const columns = [
    {
        title: 'Khoản mục chi phí',
        dataIndex: 'category'
    },
    {
        title: 'Giá trị',
        dataIndex: 'value'
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
        value: 0,
        symbol: 'G'
    },
    {
        key: '1',
        category: 'Chi phí chung',
        value: 0,
        symbol: 'C'
    },
    {
        key: '2',
        category: 'Thu nhập chịu thuế tính trước',
        value: 0,
        symbol: 'TL'
    },
    {
        key: '3',
        category: 'Chi phí xây dựng phần mềm',
        value: 0,
        symbol: 'GMP'
    },
]

const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 2
  })

export default function SoftwareEstimation(){
    const {summary} = useContext(TableDataContext)
    const [datas, setDatas] = useState(initialDatas)
    const [summaryCells,setSummaryCells] = useState(summaryRow)

    useEffect(() => {
        const finalCost = [...datas]
        finalCost[0]["value"] = formatter.format(summary.g)
        finalCost[1]["value"] = formatter.format(summary.c)
        finalCost[2]["value"] = formatter.format(summary.tl)
        finalCost[3]['value'] = formatter.format(summary.gpm)
        setDatas(finalCost)
    }, [summary]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        const totalFinal = [...summaryCells]
        totalFinal[0]['value'] = formatter.format(summary.gpm)
        setSummaryCells(totalFinal)
    },[summary]) // eslint-disable-line react-hooks/exhaustive-deps

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
