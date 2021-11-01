import React, {useState} from 'react'
import ProjectDetailsLayout from '../components/ProjectDetailsLayout'
import EditTableCell from '../components/EditTableCell';
import 'antd/dist/antd.css';

const columns = [
    {
        title: 'Các hệ số',
        dataIndex: 'heso',
    }, 
    {
        title: 'Trọng số',
        dataIndex: 'trongso',
    },
    {
        title: 'Giá trị xếp hạng',
        dataIndex: 'diem',
        editable: true
    },
    {
        title: 'Kết quả',
        dataIndex: 'ketqua',
    },
    {
        title: 'Ghi chú',
        dataIndex: 'note',
        editable: true
    }
]
const initalValues = [
    {
        key: '0',
        heso: 'Hệ thống phân tán',
        trongso: 2,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '1',
        heso: 'Tính chất đáp ứng tức thời hoặc yêu cầu đảm bảo thông lượng',
        trongso: 1,
        diem: 0 ,
        ketqua: 0,
        note: ''
    },
    {
        key: '2',
        heso: 'Hiệu quả sử dụng trực tuyến',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '3',
        heso: 'Độ phức tạp xử lý bên trong',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '4',
        heso: 'Mã nguồn phải tái sử dụng được',
        trongso: 2,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '5',
        heso: 'Dễ cài đặt',
        trongso: 0.5,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '6',
        heso: 'Dễ sử dụng',
        trongso: 0.5,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '7',
        heso: 'Khả năng chuyển đổi',
        trongso: 2,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '8',
        heso: 'Khả năng dễ thay đổi',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '9',
        heso: 'Khả năng chuyển đổi',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '10',
        heso: 'Sử dụng đồng thời',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '11',
        heso: 'Có các tính năng bảo mật đặc biệt',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '12',
        heso: 'Cung cấp truy nhập trức tiếp tới các phần mềm của hãng thứ ba',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: ''
    },
    {
        key: '13',
        heso: 'Yêu cầu phương tiện đào tạo đặc biệt cho người sử dụng',
        trongso: 1,
        diem: 0,
        ketqua: 0,
        note: ''
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

export default function UseCasePoint() {
    const [datas,setDatas] = useState(initalValues)

    const handleChangePoint = (id,score) => {
       const newData = datas.map(data => {
           if(data.key === id) return {...data, diem:score, ketqua: score * data.trongso}
           return data
       })

       setDatas(newData)
    }



    return (
        <ProjectDetailsLayout>
            <EditTableCell 
            columns={columns} 
            dataSource={datas} 
            handleChangePoint={handleChangePoint} 
            options ={scoreOptions}
            />
        </ProjectDetailsLayout>
    )
}
