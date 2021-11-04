import React, {useState,useEffect} from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell';
import 'antd/dist/antd.css';
import { Typography } from 'antd';

const { Title } = Typography;


const columns = [
    {
        title: 'Các hệ số',
        dataIndex: 'heso',
    }, 
    {
        title: 'Trọng số',
        dataIndex: 'trongso',
    },
    {
        title: 'Giá trị xếp hạng',
        dataIndex: 'diem',
        editable: true
    },
    {
        title: 'Kết quả',
        dataIndex: 'ketqua',
    },
]
const initalValues = [
    {
        key: '0',
        heso: 'Hệ thống phân tán',
        trongso: 2,
        diem: 0,
        ketqua: 0,
        note: '-',
    },
    {
        key: '1',
        heso: 'Tính chất đáp ứng tức thời hoặc yêu cầu đảm bảo thông lượng',
        trongso: 1,
        diem: 0 ,
        ketqua: 0,
        note: '-'
    },
    {
        key: '2',
        heso: 'Hiệu quả sử dụng trực tuyến',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
    {
        key: '3',
        heso: 'Độ phức tạp xử lý bên trong',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
    {
        key: '4',
        heso: 'Mã nguồn phải tái sử dụng được',
        trongso: 2,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
    {
        key: '5',
        heso: 'Dễ cài đặt',
        trongso: 0.5,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
    {
        key: '6',
        heso: 'Dễ sử dụng',
        trongso: 0.5,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
    {
        key: '7',
        heso: 'Khả năng chuyển đổi',
        trongso: 2,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
    {
        key: '8',
        heso: 'Khả năng dễ thay đổi',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
    {
        key: '9',
        heso: 'Khả năng chuyển đổi',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
    {
        key: '10',
        heso: 'Sử dụng đồng thời',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
    {
        key: '11',
        heso: 'Có các tính năng bảo mật đặc biệt',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
    {
        key: '12',
        heso: 'Cung cấp truy nhập trức tiếp tới các phần mềm của hãng thứ ba',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
    {
        key: '13',
        heso: 'Yêu cầu phương tiện đào tạo đặc biệt cho người sử dụng',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: '-'
    },
]

const scoreOptions = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    }
]

const initialsummaryRow = [
    {
        key: '14',
        name: "Hệ số KT-CN (TFW)",
        colSpan: 3,
        value: 0,
    }, 
    {
        key: '15',
        name: "Hệ số phức tạp về KT-CN (TCF)",
        colSpan: 3,
        value: 0,
    }
]

export default function TechnologyComplexity() {
    const [datas,setDatas] = useState(initalValues)
    const [summaryCells,setSummaryCells] = useState(initialsummaryRow)
    

    const handleSummaryValues = (totalScore) => {
        const tfw = Math.floor(totalScore)
        const tcf = (0.6 + (0.01 * tfw)).toFixed(2)
        const summaryValues = [...summaryCells]
        summaryValues[0].value = tfw
        summaryValues[1].value = tcf
        setSummaryCells(summaryValues)
    }
    const handleChangePoint = (row) => {
        const {key,diem,note} = row
        const newData = datas.map(data => {
            if(data.key === key) return {...data, diem:diem, ketqua: diem * data.trongso, note: note}
            return data
        })
       setDatas(newData)
    }

    useEffect(()=>{
        let totalScore = 0
        for (let i=0; i< datas.length; i++){
            totalScore += datas[i].ketqua
        }
        handleSummaryValues(totalScore)
    },[datas]) // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <ProjectDetailsLayout>
            <Title level={3}>Bảng tính toán hệ số phức tạp kỹ thuật - công nghệ</Title>
            <EditTableCell 
            columns={columns} 
            dataSource={datas} 
            handleChangePoint={handleChangePoint} 
            options ={scoreOptions}
            summaryCells = {summaryCells}
            />
        </ProjectDetailsLayout>
    )
}
