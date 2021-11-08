import React, {useState,useEffect,useContext} from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import TableDataContext from '../context/tableData-context';

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
    const {table5,updateTable5,updateSummary} = useContext(TableDataContext)
    const [datas,setDatas] = useState(table5)
    const [summaryCells,setSummaryCells] = useState(initialsummaryRow)
    

    const handleSummaryValues = (totalScore) => {
        const tfw = Math.floor(totalScore)
        const tcf = (0.6 + (0.01 * tfw)).toFixed(2)
        const summaryValues = [...summaryCells]
        summaryValues[0].value = tfw
        summaryValues[1].value = tcf
        setSummaryCells(summaryValues)
        updateSummary({tfw:summaryValues[0].value,tcf:summaryValues[1].value})
    }
    const handleChangePoint = (row) => {
        const {key,diem,note} = row
        const newData = datas.map(data => {
            if(data.key === key) return {...data, diem:diem, ketqua: diem * data.trongso, note: note}
            return data
        })
       setDatas(newData)
       updateTable5(newData)
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
