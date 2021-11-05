import { useState, useEffect } from 'react';

export default function useTableWithSummary(init,heso,type){
   // console.log(init)
    const [usecases,setUsecases] = useState(init)
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
        //console.log(updatedData)
        setUsecases(updatedData)
    }

    const handleSummaryValues = (value) => {
        const updated = [...summaryCell]
        updated[0].value = value
        setSummaryCells(updated)
    }

    useEffect(()=>{
        let totalScore = 0
        for(let i=0; i< init.length; i++){
            totalScore += usecases[i].score * heso
        }
        handleSummaryValues(totalScore)
    },[usecases]) // eslint-disable-line react-hooks/exhaustive-deps


    return [usecases,summaryCell,handleChangePoints]
}