import React, {useContext, useState} from 'react'
import 'antd/dist/antd.css';
import './CardItem.css';
import { Card, Col, Row, Button } from 'antd';
import ProjectCreateForm from './ProjectCreateForm';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router'
import projectContext from '../context/projects-context';

// const initData = [
//     {
//         key: uuidv4(),
//         projectName: 'Music Player',
//         desc: 'Xây dựng ứng dụng nghe nhạc đa nền tảng'
//     },
//     {
//         key: uuidv4(),
//         projectName: 'Budget App',
//         desc: 'Ứng dụng giúp quản lý thu chi tài chính'
//     },
//     {
//         key: uuidv4(),
//         projectName: 'Timerly',
//         desc: 'Widget đồng hồ đếm ngược trên IOS'
//     },
//     {
//         key: uuidv4(),
//         projectName: 'Kochi dictionary',
//         desc: 'Ứng dụng tra từ điển tiếng Trung cho học sinh'
//     },
//     {
//         key: uuidv4(),
//         projectName: 'Tododo',
//         desc: 'Ứng dụng ghi lại và thông báo công việc cần làm trên Android'
//     },
// ]


export default function CardItem() {
    const history = useHistory()
    const [visible, setVisible] = useState(false);
    //const [data,setData] = useState(initData)
    const {project, handleProjectChange} = useContext(projectContext)

    const result = project.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index/3)
      
        if(!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }
      
        resultArray[chunkIndex].push(item)
      
        return resultArray
      }, [])


    const onCreate = (values) => {
        const updatedProjects = [...project]
        const newProject = {key: uuidv4(), projectName: values.title, desc: values.description,employees:values.employees} 
        updatedProjects.push(newProject)
        //console.log('Received values of form: ', values);
        setVisible(false);
        handleProjectChange(updatedProjects)
        //setData(updatedProjects)
        // window.history.replaceState(null, null, `project-details/${newProject.key}/software-estimate` );
        history.push(`project-details/${newProject.key}/software-requirement`);
    }

    return (
    <>
    {
        result.map(array => {
            return <div className="site-card-wrapper" key={uuidv4()}>
                <Row gutter={16}>
                    {
                        array.map(el => {
                            return <Col span={8} key = {el.key}>
                                <Card title= {el.projectName} extra={<a href="#/">Xóa</a>}>
                                    <p>{el.desc}</p>
                                    <Button type="primary">Xem chi tiết</Button>
                                </Card>
                            </Col>
                        })
                    }
                </Row>
            </div>
        })
    }
    <div className="site-card-wrapper">
        <Row gutter={16}>
            <Col span={8}>
                <Card title="Tạo dự án">
                <p>Thêm dự án và xác định chi phí cho phầm mềm</p>
                <Button 
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
                >
                    Tạo mới
                </Button>
                </Card>
            </Col>
        </Row>
    </div>
    
    <ProjectCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
        setVisible(false);
        }}
    />
    </>
    )
}
