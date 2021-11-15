import React from 'react'
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';
const { Option } = Select;

const ModalForm = (props) => {
    const {visible, onCreate, onCancel} = props
    const [form] = Form.useForm();
    const {title,inputsText,inputsSelect} = props
    return (
      <Modal
        visible={visible}
        title= {title}
        okText="Lưu"
        cancelText="Hủy"
        onCancel={()=>{form.resetFields();onCancel()}}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            //employees: '1'
          }}
        >
            {inputsText.map(input => {
                return (
                <Form.Item
                name={input.name}
                label={input.label}
                rules={[
                  {
                    required: true,
                    message: `${input.label} không thể bỏ trống`,
                  },
                ]}
                key = {input.label}
                >
                <Input />
                </Form.Item>)
            })}
            {
                inputsSelect.map(input => {
                    return (
                        <Form.Item
                        name={input.name}
                        label={input.label}
                        key = {input.label}
                        rules={[
                          {
                            required: true,
                            message: `${input.label} không thể bỏ trống`,
                          },
                        ]}
                        >
                        <Select>
                            {input.options.map(option => {
                                return <Option key = {option} >{option}</Option>
                            })}
                        </Select>
                        </Form.Item>
                    )
                })
            }
        </Form>
      </Modal>
    );
  };

export default ModalForm
