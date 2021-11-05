import React, {useState,useEffect,useContext} from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import TableDataContext from '../context/tableData-context';

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

const initialsummaryRow = [
    {
        key: '4',
        name: 'TAW',
        colSpan: 4,
        value: 0
    }
]

export default function ActorPoints(){
    const {table3,updateTable3,updateSummary} = useContext(TableDataContext)
    const [datas,setDatas] = useState(table3)
    const [summaryCells,setSummaryCells] = useState(initialsummaryRow)

    const handleChangePoint = (row) => {
        const {key,actorNum,note} = row
        const newData = datas.map(data => {
            if(data.key === key) return {...data, actorNum:actorNum, ketqua: actorNum * data.trongso, note: note}
            return data
        })
        setDatas(newData)
        updateTable3(newData)
    }

    const handleSummaryValues = (totalScore) => {
        const summaryValues = [...summaryCells]
        summaryValues[0].value = Math.floor(totalScore)
        setSummaryCells(summaryValues)
        updateSummary({taw:summaryValues[0].value})
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