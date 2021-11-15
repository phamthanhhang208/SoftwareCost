import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function useTableEditRow(datas,cb){
    const [data, setData] = useState(datas)
    

    const handleData = (array) => {
        setData(array)
        cb(array)
    }

    const handleAdd = (values) => {
        const newData = [...data]
        const newRow = {...values,key: uuidv4()}
        newData.push(newRow)
        setData(newData)
        cb(newData)
    }

    const handleDelete = (key) => {
        const newData = [...data]
        setData(newData.filter((item) => item.key !== key))
    }

    return [handleDelete,handleAdd,handleData,data]
}