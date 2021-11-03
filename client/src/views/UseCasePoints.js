import React,{useState,useEffect} from 'react'
import useTableWithSummary from '../hooks/useTableWithSummary'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell'
import { Typography } from 'antd';
const { Title } = Typography;

const columns = [
    {
        title : 'Loại Use Case',
        dataIndex: 'type',
        key: 'type'
    },
    {
        title : 'Số trường hợp sử dụng',
        dataIndex: 'usecaseNum',
        key: 'usecaseNum',
        editable: true
    },
    {
        title : 'Điểm của từng trường hợp',
        dataIndex: 'score',
        key: 'score'
    },
]


export default function UseCasePoints() {
    const[usecaseB,summaryCellB,handleChangePointsB] = useTableWithSummary(1,'B')
    const[usecaseM,summaryCellM,handleChangePointsM] = useTableWithSummary(1.2 ,'M')
    const[usecaseT,summaryCellT,handleChangePointsT] = useTableWithSummary(1.5 ,'T')
    const[tbf,setTbf] = useState(0)

    useEffect(() => {
        //console.log(summaryCellB)
        setTbf(summaryCellB[0].value + summaryCellM[0].value + summaryCellT[0].value)
    }, [summaryCellB,summaryCellM,summaryCellT])
    
    return (
        <ProjectDetailsLayout>
            <Title level={3}>Bảng tính toán điểm các trường hợp sử dụng</Title>
            <Title level={4}>TBF: {tbf}</Title> 
            <Title level={5}>Trường hợp sử dụng loại B </Title>
            <EditTableCell
            columns={columns} 
            dataSource={usecaseB} 
            handleChangePoint={handleChangePointsB} 
            summaryCells = {summaryCellB} 
            />
            <Title level={5}>Trường hợp sử dụng loại M </Title>
            <EditTableCell
            columns={columns} 
            dataSource={usecaseM} 
            handleChangePoint={handleChangePointsM} 
            summaryCells = {summaryCellM}
            />
            <Title level={5}>Trường hợp sử dụng loại T</Title>
            <EditTableCell
            columns={columns} 
            dataSource={usecaseT} 
            handleChangePoint={handleChangePointsT} 
            summaryCells = {summaryCellT}
            />
        </ProjectDetailsLayout>
    )
}
