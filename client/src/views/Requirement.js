import React, {useContext} from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableRow from '../components/EditTableRow'
import useTableEditRow from '../hooks/useTableEditRow';
import TableDataContext from '../context/tableData-context';

const columns = [
    {
        title: 'Mô tả yêu cầu',
        dataIndex: 'requirement',
        editable: true,
    },
    {
        title: 'Phân loại',
        dataIndex: 'type',
        editable: true,
    },
    {
        title: 'Ghi chú',
        dataIndex: 'note',
        editable: true,
    }
]

const option = [["Dữ liệu đầu ra", "Dữ liệu đầu vào", "Yêu cầu truy vấn", "Cơ sở dữ liệu", "Dữ liệu tra cứu"]]

export default function Requirement() {
    const {table1,updateTable1} = useContext(TableDataContext)
    const [handleDelete,handleAdd,handleData,data] = useTableEditRow({requirement:'-',type:'-',note:'-'},table1,updateTable1)
    
    return (
        <ProjectDetailsLayout>
            <EditTableRow
            data = {data}
            handleData = {handleData}
            columnName = {columns} 
            option= {option}
            handleAdd = {handleAdd}
            handleDelete = {handleDelete}
            />
        </ProjectDetailsLayout>
    )
}
