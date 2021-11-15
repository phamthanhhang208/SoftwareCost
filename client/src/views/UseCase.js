import React, {useContext} from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableRow from '../components/EditTableRow'
import useTableEditRow from '../hooks/useTableEditRow'
import TableDataContext from '../context/tableData-context';

const columns = [
    {
        title: 'Tên Use-case',
        dataIndex: 'usecase',
        editable: true,
    },
    {
        title: 'Tên tác nhân chính',
        dataIndex: 'mainActor',
        editable: true,
    },
    {
        title: 'Tên tác nhân phụ',
        dataIndex: 'minorActor',
        editable: true,
    },
    {
        title: 'Mô tả trường hợp sử dụng',
        dataIndex: 'desc',
        editable: true,
    },
    {
        title: 'Phân loại Use-case',
        dataIndex: 'type1',
        editable: true,
    },
    {
        title: 'Mức độ cần thiết',
        dataIndex: "type",
        editable: true,
    }
]

const option = [["B","M","T"],["Đơn giản", "Trung Bình", "Phức tạp"]]

const inputsText = [{label:'Tên Use-case', name:'usecase' },{label:'Tên tác nhân chính', name:'mainActor'},{label:'Tên tác nhân phụ', name:'minorActor'},{label:'Mô tả trường hợp sử dụng', name:'desc'}]
const inputsSelect = [{label:'Phân loại Use-case', options:option[0], name:'type1'},{label:'Mức độ cần thiết', options:option[1], name:'type'}]

export default function UseCase() {
    const {table2,updateTable2} = useContext(TableDataContext)
    const [handleDelete,handleAdd,handleData,data] = useTableEditRow(table2,updateTable2)
    return (
        <ProjectDetailsLayout>
            <EditTableRow 
             data = {data}
             handleData = {handleData}
             columnName = {columns} 
             option= {option}
             handleAdd = {handleAdd}
             handleDelete = {handleDelete}
             title = 'Mô tả trường hợp sử dụng'
             inputsText = {inputsText}
             inputsSelect = {inputsSelect}
            />
        </ProjectDetailsLayout>
    )
}
