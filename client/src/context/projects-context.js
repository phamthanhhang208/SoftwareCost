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
    }
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