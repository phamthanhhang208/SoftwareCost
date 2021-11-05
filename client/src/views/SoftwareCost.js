import React, {useContext, useEffect, useState} from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell'
import { Typography } from 'antd';
import TableDataContext from '../context/tableData-context';

const { Title } = Typography;

const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 0 ) {
        obj.props.colSpan = 0;
      }
    return obj;
  };

const columns = [
    {
        title: 'Hạng mục',
        dataIndex: 'category',
        width: "30%",
        render: (text,row,index) => {
            if(index === 0){
                return {
                    children: text,
                    props: {}
                }
            } else {
                return text
            } 
        }
    },
    {
        title: 'Giá trị',
        dataIndex: 'value',
        render: renderContent
    }
]

const initialDatas = [
    {
        key: '0',
        category: 'Tính điểm trương hợp sử dụng Use case'
    },
    {
        key:'1',
        category: 'Điểm Actor(TAW)',
        value: 0
    },
    {
        key:'2',
        category: 'Điểm Use-case(TBF)',
        value: 0
    },
    {
        key:'3',
        category: 'Tính điểm UUCP',
        value: 0
    },
    {
        key:'4',
        category: 'Hệ số phức tạp về KT-CN (TCF)',
        value: 0
    },
    {
        key:'5',
        category: 'Hệ số phức tạp về môi trường (EF)',
        value: 0
    },
    {
        key:'6',
        category: 'Tính điểm AUCP',
        value: 0
    },
]
const initSummaryCells = [
    {
        key: '0',
        name: 'Nội suy thời gian lao động (P)',
        colSpan: 1,
        value: 0
    },
    {
        key: '1',
        name: 'Giá trị nỗ lực thực tế (E)',
        colSpan: 1,
        value: 0
    },
    {
        key: '2',
        name: 'Mức lương lao động bình quân (H)',
        colSpan: 1,
        value: 44238
    },
    {
        key: '3',
        name: 'Giá trị phần mềm nội bộ (G)',
        colSpan: 1,
        value: 0
    },
]

const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 2
  })


export default function SoftwareCost() {
    const {summary} = useContext(TableDataContext)
    // eslint-disable-next-line
    const [datas,setDatas] = useState(initialDatas)
    // eslint-disable-next-line
    const [summaryCells,setSummaryCells] = useState(initSummaryCells)

    useEffect(()=>{
        //console.log('effect running')
        const usecasePoints = [...datas]
        usecasePoints[1]["value"] = summary.taw
        usecasePoints[2]['value'] = summary.tbf
        usecasePoints[3]['value'] = summary.uucp
        usecasePoints[4]['value'] = summary.tcf
        usecasePoints[5]['value'] = summary.ef
        usecasePoints[6]['value'] = summary.aucp
        setDatas(usecasePoints)
    },[summary]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        //console.log('effect in other point')
        const otherPoints = [...summaryCells]
        otherPoints[0]['value'] = summary.p
        otherPoints[1]['value'] = summary.e
        otherPoints[2]['value'] =  formatter.format(summary.h)
        otherPoints[3]['value'] =  formatter.format(summary.g)
        setSummaryCells(otherPoints)
    },[summary]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ProjectDetailsLayout>
            <Title level={3}>Bảng tính toán giá trị phần mềm</Title>
            <EditTableCell
            columns= {columns}
            dataSource={datas} 
            summaryCells = {summaryCells} 
            />
        </ProjectDetailsLayout>
    )
}
