import React, {useEffect, useState} from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell'

const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 0 || index === 6) {
        obj.props.colSpan = 0;
      }
    return obj;
  };

const initColumns = [
    {
        title: 'Các hệ số tác động môi trường',
        dataIndex: 'heso',
        ellipsis: true,
        width: "30%",
        render: (text,row,index) => {
            if(index === 0 || index === 6){
                return {
                    children: text,
                    props: {}
                }
            } else {
                return text
            } 
        }
    }, 
    {
        title: 'Trọng số chuẩn',
        dataIndex: 'trongso',
        render: renderContent,
    },
    {
        title: 'TB cộng giá trị xếp hạng',
        dataIndex: 'tbc',
        render: renderContent,
        editable: true
    },
    {
        title: 'Kết quả',
        dataIndex: 'ketqua',
        render: renderContent,
    },
    {
        title: 'Độ ổn định kinh nghiệm',
        dataIndex: 'ondinh',
        render: renderContent,
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

const initialDatas = [
    {
        key: '1',
        heso: 'Đánh giá cho từng thành viên',
    },
    {
        key: '2',
        heso: 'Có áp dụng qui trình phát triển phần mềm theo mẫu RUP và có hiểu biết về RUP hoặc quy trình phát triển phần mềm tương đương',
        trongso: 1.5,
        tbc: '',
        ketqua: '',
        ondinh: 0,
    },
    {
        key: '3',
        heso: 'Có kinh nghiệm về ứng dụng tương tự',
        trongso: 0.5,
        tbc: '',
        ketqua: '',
        ondinh: 0
    },
    {
        key: '4',
        heso: 'Có kinh nghiệm về hướng đối tượng',
        trongso: 1,
        tbc: '',
        ketqua: '',
        ondinh: 0
    },
    {
        key: '5',
        heso: 'Có khả năng lãnh đạo nhóm',
        trongso: 0.5,
        tbc: '',
        ketqua: '',
        ondinh: 0
    },
    {
        key: '6',
        heso: 'Tính chất năng động',
        trongso: 1,
        tbc: '',
        ketqua: '',
        ondinh: 0
    },
    {
        key: '7',
        heso: 'Đánh giá chung cho dự án'
    },
    {
        key: '8',
        heso: 'Độ ổn định của các yêu cầu',
        trongso: 2,
        tbc: 0,
        ketqua: 0,
        ondinh: 0
    },
    {
        key: '9',
        heso: 'Sử dụng các nhân viên bán thời gian',
        trongso: -1,
        tbc: 0,
        ketqua: 0,
        ondinh: 0
    },
    {
        key: '10',
        heso: 'Dùng ngôn ngữ lập trình loại khó',
        trongso: -1,
        tbc: 0,
        ketqua: 0,
        ondinh: 0
    },

]

const initSummaryCells = [
    {
        key: '1',
        name: 'Hệ số tác đọng môi trường và nhóm làm việc (EFW)',
        colSpan: 3,
        value: 0
    },
    {
        key: '2',
        name: 'Hệ số phức tạp về môi trường (EF)',
        colSpan: 3,
        value: 0
    },
    {
        key: '3',
        name: 'Độ ổn định kinh nghiệm (ES)',
        colSpan: 3,
        value: 0
    },
    {
        key: '4',
        name: 'Nội suy thời gian lao động (P)',
        colSpan: 3,
        value: 0
    },
]

const round = (num) => {
    return Math.round(num*100)/100
}

function esCalc(num){
    if(num<=0) return 0
    if(num > 0 && num <= 1 ) return 0.05
    if(num > 1 && num <= 2) return 0.1
    if(num >2 && num <= 3 ) return 0.6
    if(num > 3 ) return 1    
}

function pCalc(num){
    if(num<1) return 48
    if(1 <=num && num < 3) return 32
    if (num >= 3) return 20
}

export default function EnvironmentImpact() {

    const [columns,setColumns] = useState(initColumns)
    const [datas,setDatas] = useState(initialDatas)
    const [summaryCells,setSummaryCells] = useState(initSummaryCells)

    const employee = 6

    useEffect(()=>{
        const updatedColumns = [...columns]
        for (let i = 1; i <= employee; i++){
            updatedColumns.splice(i+1,0,{title:`NV ${i}`,dataIndex:`diem${i}`,editable: true})
        } 
        setColumns(updatedColumns)
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const updatedData = [...datas]
        let employeeScore = {}

        for (let i=0; i<= employee; i++){
            employeeScore[`diem${i}`] = 0
        }

        for (let i = 1; i<=5; i++){
            updatedData[i] = {...updatedData[i],...employeeScore}
        }
        setDatas(updatedData)
    }, [columns]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangePoint = (row) => {
        const {key} = row
        //console.log(row)
        let employeeScore = 0
        for (let i=0; i<= employee; i++){
            employeeScore += parseInt(row[`diem${i}`])
        }

        const newData = datas.map(data => {
            if(data.key === key && Object.keys(row).includes('diem1')) return {...row,tbc: round(employeeScore/employee), ketqua: round((employeeScore/employee) * row.trongso), ondinh: esCalc(round((employeeScore/employee) * row.trongso))  }
            if(data.key === key && !Object.keys(row).includes('diem1')) return {...row,ketqua:round(row.tbc * row.trongso), ondinh: esCalc(round(row.tbc * row.trongso))}
            return data
        })
        setDatas(newData)
        
    }

    useEffect(() => {
        const summaryCellsValues = [...summaryCells]
        let efw = 0
        let es = 0
        for(let i=0; i<initColumns.length-2; i++){
            efw += datas[i].ketqua || 0
            es += datas[i].ondinh || 0
        }

        summaryCellsValues[0].value = efw
        summaryCellsValues[1].value = round(1.4 + (0.03 * efw))
        summaryCellsValues[2].value = es
        summaryCellsValues[3].value = pCalc(es)

        setSummaryCells(summaryCellsValues)
        
    }, [datas])  // eslint-disable-line react-hooks/exhaustive-deps

    
    return (
        <ProjectDetailsLayout>
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
