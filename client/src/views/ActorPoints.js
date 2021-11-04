import React, {useState,useEffect} from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell';
import 'antd/dist/antd.css';
import { Typography } from 'antd';

const { Title } = Typography;

const columns = [
    {
        title: "Loại Actor",
        dataIndex: "actorName",
    },
    {
        title: "Mô tả",
        dataIndex: "mota",
    },
    {
        title: "Số tác nhân",
        dataIndex: "actorNum",
        editable: true
    },
    {
        title: "Trọng số",
        dataIndex: "trongso",
    },
    {
        title: "Điểm từng loại tác nhân",
        dataIndex: "ketqua",
    },
]

const initalValues = [
    {
        key: '1',
        actorName: 'Đơn giản',
        mota: 'Thuộc loại giao diện của chương trình',
        actorNum: 0,
        trongso: 1,
        ketqua: 0,
        note: '-'
    },
    {
        key: '2',
        actorName: 'trung bình',
        mota: 'Giao diện tương tác hoặc phục vụ một giao thức hoạt động',
        actorNum: 0,
        trongso: 2,
        ketqua: 0,
        note: '-'
    },
    {
        key: '3',
        actorName: 'Phức tạp',
        mota: 'Giao diện đồ họa',
        actorNum: 0,
        trongso: 2,
        ketqua: 0,
        note: '-'
    },
]

const initialsummaryRow = [
    {
        key: '4',
        name: 'TAW',
        colSpan: 4,
        value: 0
    }
]

export default function ActorPoints(){

    const [datas,setDatas] = useState(initalValues)
    const [summaryCells,setSummaryCells] = useState(initialsummaryRow)

    const handleChangePoint = (row) => {
        const {key,actorNum,note} = row
        const newData = datas.map(data => {
            if(data.key === key) return {...data, actorNum:actorNum, ketqua: actorNum * data.trongso, note: note}
            return data
        })
        setDatas(newData)
    }

    const handleSummaryValues = (totalScore) => {
        const summaryValues = [...summaryCells]
        summaryValues[0].value = Math.floor(totalScore)
        setSummaryCells(summaryValues)
    }

    useEffect(()=>{
        let totalScore = 0
        for (let i=0; i< datas.length; i++){
            totalScore += datas[i].ketqua
        }
        handleSummaryValues(totalScore)
    },[datas]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <ProjectDetailsLayout>
            <Title level={3}>Bảng tính toán điểm các tác nhân tương tác, trao đổi thông tin với phần mềm</Title>
            <EditTableCell 
                columns = {columns}
                dataSource = {datas}
                handleChangePoint={handleChangePoint} 
                summaryCells = {summaryCells}
            />
        </ProjectDetailsLayout>
    )
}