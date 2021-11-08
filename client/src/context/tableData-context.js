import React, { createContext, useState } from "react";

const round = (num) => {
    return Math.round(num*100)/100
}


const TableDataContext = createContext({
    table1:[],
    table2:[],
    table3:[],
    table4:[],
    table5:[],
    table6:[],
    summary:{tbf:0, taw:0, tfw:0, tcf:0, efw:0, ef: 0 ,es:0, p:0, h:44238, uucp:0, aucp:0, e:0,g:0,c:0,tl:0,gpm:0},
})

export const TableDataProvider = (props) => {
    const [table1,setTable1] = useState([])
    const [table2,setTable2] = useState([])
    const [table3,setTable3] = useState([ 
    {
        key: '1',
        actorName: 'Đơn giản',
        mota: 'Thuộc loại giao diện của chương trình',
        actorNum: 0,
        trongso: 1,
        ketqua: 0,
    },
    {
        key: '2',
        actorName: 'trung bình',
        mota: 'Giao diện tương tác hoặc phục vụ một giao thức hoạt động',
        actorNum: 0,
        trongso: 2,
        ketqua: 0,
    },
    {
        key: '3',
        actorName: 'Phức tạp',
        mota: 'Giao diện đồ họa',
        actorNum: 0,
        trongso: 3,
        ketqua: 0,
    },])
    const [table4,setTable4] = useState([
        {B:[
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
        ]},
        {M:[
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
        ]},
        {T:[
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
        ]}
    ])
    const [table5,setTable5] = useState([
        {
            key: '0',
            heso: 'Hệ thống phân tán',
            trongso: 2,
            diem: 0,
            ketqua: 0,
            note: '-',
        },
        {
            key: '1',
            heso: 'Tính chất đáp ứng tức thời hoặc yêu cầu đảm bảo thông lượng',
            trongso: 1,
            diem: 0 ,
            ketqua: 0,
            note: '-'
        },
        {
            key: '2',
            heso: 'Hiệu quả sử dụng trực tuyến',
            trongso: 1,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
        {
            key: '3',
            heso: 'Độ phức tạp xử lý bên trong',
            trongso: 1,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
        {
            key: '4',
            heso: 'Mã nguồn phải tái sử dụng được',
            trongso: 2,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
        {
            key: '5',
            heso: 'Dễ cài đặt',
            trongso: 0.5,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
        {
            key: '6',
            heso: 'Dễ sử dụng',
            trongso: 0.5,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
        {
            key: '7',
            heso: 'Khả năng chuyển đổi',
            trongso: 2,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
        {
            key: '8',
            heso: 'Khả năng dễ thay đổi',
            trongso: 1,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
        {
            key: '9',
            heso: 'Khả năng chuyển đổi',
            trongso: 1,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
        {
            key: '10',
            heso: 'Sử dụng đồng thời',
            trongso: 1,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
        {
            key: '11',
            heso: 'Có các tính năng bảo mật đặc biệt',
            trongso: 1,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
        {
            key: '12',
            heso: 'Cung cấp truy nhập trức tiếp tới các phần mềm của hãng thứ ba',
            trongso: 1,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
        {
            key: '13',
            heso: 'Yêu cầu phương tiện đào tạo đặc biệt cho người sử dụng',
            trongso: 1,
            diem: 0,
            ketqua: 0,
            note: '-'
        },
    ])
    const [table6,setTable6] = useState([
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
        
        ])
    const [summary,setSummary] = useState({tbf:0, taw:0, tfw:0, tcf:0, h:44238, efw:0, ef: 0 ,es:0, p:0, uucp:0, aucp:0, e:0,g:0,c:0,tl:0,gmp:0})
    
    const handleTable1Change = (data) => {
        setTable1(data)
    }
    const handleTable2Change = (data) => {
        setTable2(data)
    }

    const handleTable3Change = (data) => {
        setTable3(data)
    }

    const handleTable4Change = (data) => {
        setTable4(data)
    }

    const handleTable5Change = (data) => {
        setTable5(data)
    }

    const handleTable6Change = (data) => {
        setTable6(data)
    }

    const handleSummaryChange = (obj) => {
        const totalSummary = {...summary,...obj}
        totalSummary["uucp"] = round(totalSummary["taw"] + totalSummary["tbf"])
        totalSummary["aucp"] = round(totalSummary["uucp"] * totalSummary["tcf"] * totalSummary["ef"])
        totalSummary["e"] = round(10/6 * totalSummary["aucp"])
        totalSummary["g"] = round(1.4*totalSummary['e']*totalSummary['p']*totalSummary['h'])
        totalSummary["c"] = round(totalSummary["g"]*0.65)
        totalSummary["tl"] = round((totalSummary['g']+totalSummary['c'])*0.06)
        totalSummary['gpm'] = round(totalSummary['g']+totalSummary['c']+totalSummary['tl'])
        setSummary(totalSummary)
    }


    const contextValueTable = {
        table1: table1,
        updateTable1: handleTable1Change,
        table2: table2,
        updateTable2: handleTable2Change,
        table3:table3,
        updateTable3: handleTable3Change,
        table4:table4,
        updateTable4: handleTable4Change,
        table5:table5,
        updateTable5: handleTable5Change,
        table6:table6,
        updateTable6: handleTable6Change,
        summary:summary,
        updateSummary: handleSummaryChange,
    }

    return (
        <TableDataContext.Provider value={contextValueTable}>
            {props.children}
        </TableDataContext.Provider>
    )
}

export default TableDataContext