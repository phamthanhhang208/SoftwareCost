import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './EditTableRow.css';
import { Table, Input, Select , Popconfirm, Form, Typography, Button } from 'antd';
const { Option } = Select;


const EditTableRow = (props) => {
  const [form] = Form.useForm();
  const {data, handleData, columnName, option, handleAdd, handleDelete } = props
  //const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    // const inputNode = inputType === 'select' ? (option.map(option => {
    //   return <Select key={uuidv4()}>
    //     {option.map(array => {
    //         return <Option key={array}>{array}</Option>
    //     })}
    // </Select>}) ): <Input />;
    let inputNode = null
    if(dataIndex === 'type'){
      inputNode = <Select>{option[0].map(array => {
        return <Option key={array}>{array}</Option>
      })}</Select>
    } else if(dataIndex === 'type1'){
      inputNode = <Select>{option[1].map(array => {
        return <Option key={array}>{array}</Option>
      })}</Select>
    } else {
      inputNode = <Input />
    }

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={ dataIndex !== 'note' ? [
              {
                required: true,
                message: `không được bỏ trống ${title}!`,
              },
            ] : null}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        handleData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        handleData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const editColumns = [
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
           
          <span>
             {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */} 
            <a
            /*eslint-disable-next-line no-script-url*/
              href="#/"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */} 
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
        <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{
                marginRight: 8,
              }}>
                Edit
            </Typography.Link>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */} 
                <a>Delete</a>
            </Popconfirm>
        </>
        );
      },
    },
  ];

  const columns = [...columnName,...editColumns]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex.includes('type') ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
    <Button
        onClick={handleAdd}
        type="primary"
        style={{
            marginBottom: 16,
        }}
        >
        Thêm dòng
    </Button>
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    </>
  );
};

export default EditTableRow