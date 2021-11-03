import { useState, useEffect } from 'react';

const initalValues = [
    {
        key: '1',
        type: 'Đơn giản',
        usecaseNum: 0,
        score: 0
    },
    {
        key: '2',
        type: 'Trung bình',
        usecaseNum: 0,
        score: 0
    },
    {
        key: '3',
        type: 'Phức tạp',
        usecaseNum: 0,
        score: 0
    },
]

export default function useTableWithSummary(heso,type){

    const [usecases,setUsecases] = useState(initalValues)
    const [summaryCell,setSummaryCells] = useState([
        {
            key: `summary${type}`,
            name: `${type}`,
            colSpan: 3,
            value: 0
        }
    ])

    const handleChangePoints = (row) => {
        const {key,usecaseNum,type} = row
        const updatedData = usecases.map(usecase => {
            if(key === usecase.key && type === 'Đơn giản' ) return {...usecase, usecaseNum:usecaseNum ,score: (5 * parseInt(usecaseNum)) }
            if(key === usecase.key && type === 'Trung bình') return {...usecase, usecaseNum:usecaseNum, score: 10 * parseInt(usecaseNum) }
            if(key === usecase.key && type === 'Phức tạp') return {...usecase, usecaseNum:usecaseNum, score: 15 * parseInt(usecaseNum) }
            return usecase
        })
        setUsecases(updatedData)
    }

    const handleSummaryValues = (value) => {
        const updated = [...summaryCell]
        updated[0].value = value
        setSummaryCells(updated)
    }

    useEffect(()=>{
        let totalScore = 0
        for(let i=0; i< initalValues.length; i++){
            totalScore += usecases[i].score * heso
        }
        handleSummaryValues(totalScore)
    },[usecases]) // eslint-disable-line react-hooks/exhaustive-deps


    return [usecases,summaryCell,handleChangePoints]
}