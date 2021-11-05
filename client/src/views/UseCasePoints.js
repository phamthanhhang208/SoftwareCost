import React,{useState,useEffect, useContext} from 'react'
import useTableWithSummary from '../hooks/useTableWithSummary'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell'
import TableDataContext from '../context/tableData-context';
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
    const {table4,updateTable4,updateSummary} = useContext(TableDataContext)
    const[usecaseB,summaryCellB,handleChangePointsB] = useTableWithSummary(table4[0]["B"],1,'B')
    const[usecaseM,summaryCellM,handleChangePointsM] = useTableWithSummary(table4[1]["M"],1.2 ,'M')
    const[usecaseT,summaryCellT,handleChangePointsT] = useTableWithSummary(table4[2]["T"],1.5 ,'T')
    const[tbf,setTbf] = useState(0)

    useEffect(() => {
        const total = summaryCellB[0].value + summaryCellM[0].value + summaryCellT[0].value
        //console.log('effect running')
        setTbf(total)
        updateSummary({tbf:total})
        updateTable4([{B:usecaseB},{M:usecaseM},{T:usecaseT}])
    }, [summaryCellB,summaryCellM,summaryCellT,usecaseB,usecaseM,usecaseT]) // eslint-disable-line react-hooks/exhaustive-deps
    
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
