import React, {useState} from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell'
import { Typography } from 'antd';

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


export default function SoftwareCost() {
    const [datas,setDatas] = useState(initialDatas)
    const [summaryCells,setSummaryCells] = useState(initSummaryCells)

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
