import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const projectContext = createContext({
    project: [],
    handleProjectChange: (projects) => {},
})

const initProject = [
    {
        key: uuidv4(),
        projectName: 'Music Player',
        desc: 'Xây dựng ứng dụng nghe nhạc đa nền tảng',
        employees: 4
    },
    {
        key: uuidv4(),
        projectName: 'Budget App',
        desc: 'Ứng dụng giúp quản lý thu chi tài chính',
        employees: 4
    },
    {
        key: uuidv4(),
        projectName: 'Timerly',
        desc: 'Widget đồng hồ đếm ngược trên IOS',
        employees: 4
    },
    {
        key: uuidv4(),
        projectName: 'Kochi dictionary',
        desc: 'Ứng dụng tra từ điển tiếng Trung cho học sinh',
        employees: 4
    },
    {
        key: uuidv4(),
        projectName: 'Tododo',
        desc: 'Ứng dụng ghi lại và thông báo công việc cần làm trên Android',
        employees: 4
    },
]

export const ProjectProvider = (props) => {
    const [project,setProject] = useState(initProject)

    const handleProjectChange = (projects) => {
        setProject(projects)
    }

    const contextValue = {
        project: project,
        handleProjectChange: handleProjectChange
    }

    return (
        <projectContext.Provider value={contextValue}>
            {props.children}
        </projectContext.Provider>
    )
}

export default projectContext