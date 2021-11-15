import React, { useContext, useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css';
import { Table, Form, Select, InputNumber } from 'antd';
const { Option } = Select;
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
            <tr {...props} />
        </EditableContext.Provider>
        </Form>
    );
};    


export default function EditTableCell(props) {
    const {dataSource, options}  = props
    //console.log(showHeader)
    
    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
      }) => {
        const [editing, setEditing] = useState(false);
        //const inputRef = React.createRef(null);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
          if (editing) {
            inputRef?.current?.focus();
          }
        }, [editing]);
      
        const toggleEdit = () => {
          setEditing(!editing);
          form.setFieldsValue({
            [dataIndex]: record[dataIndex],
          });
        };
      
        const save = async () => {
          try {
            const values = await form.validateFields();
            //console.log(values)
            toggleEdit();
            handleSave({ ...record, ...values });
          } catch (errInfo) {
            console.log('Save failed:', errInfo);
          }
        };
      
        let childNode = children;
      
        if (editable) {
          childNode = editing ? (
            <Form.Item
              style={{
                margin: 0,
              }}
              name={dataIndex}
            >
            {(dataIndex.includes("diem")) ? <Select ref={inputRef} onChange={save}>
                {options.map(option => {
                    return <Option key = {option.value} >{option.label}</Option>
                })}
            </Select>: <InputNumber type="number" min={0} ref={inputRef} onPressEnter={save} onBlur={save} /> }
            
            </Form.Item>
          ) : (
            <div
              className="editable-cell-value-wrap"
              style={{
                paddingRight: 24,
              }}
              onClick={toggleEdit}
            >
              {children}
            </div>
          );
        }
      
        return <td {...restProps}>{childNode}</td>;
      };

    
    const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
    };
    const handleSave = (row) => {
        props.handleChangePoint(row)
    }
    const columns = props.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
  
        return {
          ...col,
          onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: handleSave,
          }),
        };
      });

    return (
        <div>
            <Table
                style ={{textWrap:'word-break'}}
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination = {false}
                summary = {(pageData) =>{
                  return (
                    <>
                    {
                      props.summaryCells.map((cell)=>{
                          return <Table.Summary.Row key ={cell.key}>
                                <Table.Summary.Cell > {cell.name}</Table.Summary.Cell>
                                <Table.Summary.Cell colSpan={cell.colSpan}>
                                    {cell.value}
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                      }) 
                    }
                    </>
                  ) 
                   
                }}
            />
        </div>
    )
}
