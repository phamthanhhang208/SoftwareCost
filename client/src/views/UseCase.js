import React from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableRow from '../components/EditTableRow'
import useTableEditRow from '../hooks/useTableEditRow'

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
        title: 'Mức độ cần thiết',
        dataIndex: "type",
        editable: true,
    }
]

const option = ["B","M","T"]

export default function UseCase() {
    const [handleDelete,handleAdd,handleData,data] = useTableEditRow({usecase:'-',mainActor:'-',minorActor:'-',type:'-',desc:'-'})
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
