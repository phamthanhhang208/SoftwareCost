import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function useTableEditRow(row){
    const [data, setData] = useState([])

    const handleData = (array) => {
        setData(array)
    }

    const handleAdd = () => {
        const newData = [...data]
        const newRow = {...row,key: uuidv4()}
        newData.push(newRow)
        setData(newData)
    }

    const handleDelete = (key) => {
        const newData = [...data]
        setData(newData.filter((item) => item.key !== key))
    }

    return [handleDelete,handleAdd,handleData,data]
}