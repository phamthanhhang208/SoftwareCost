import React, { createContext, useState } from "react";

const TableDataContext = createContext({
    projects: [],
    updateProject: () => {},
    table1: [],
    updateTable1: () => {},
    table2:[],
    updateTable2: () => {},
    table3:[],
    updateTable3: () => {},
    table4:[],
    updateTable4: () => {},
    table5:[],
    updateTable5: () => {},
    table6:[],
    updateTable6: () => {},
    table7:[],
    updateTable7: () => {},
    table8:[],
    updateTable8: () => {},
})

export const TableDataProvider = (props) => {
    const [projects,setProjects] = useState([])
    const [table1,setTable1] = useState([])
    const [table2,setTable2] = useState([])
    const [table3,setTable3] = useState([])
    const [table4,setTable4] = useState([])
    const [table5,setTable5] = useState([])
    const [table6,setTable6] = useState([])
    const [table7,setTable7] = useState([])
    const [table8,setTable8] = useState([])

    const handleProjectsChange = (projects) => {
        setProjects(projects)
    }

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

    const handleTable7Change = (data) => {
        setTable7(data)
    }

    const handleTable8Change = (data) => {
        setTable8(data)
    }

    const contextValue = {
        projects: projects,
        updateProject: handleProjectsChange,
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
        table7:table7,
        updateTable7: handleTable7Change,
        table8:table8,
        updateTable8: handleTable8Change,
    }
    return (
        <TableDataContext.Provider value={contextValue}>
            {props.children}
        </TableDataContext.Provider>
    )
}

export default TableDataContext