import React from 'react'
import 'antd/dist/antd.css';
import { Modal, Form, Input, InputNumber } from 'antd';

const ProjectCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Tạo dự án"
        okText="Lưu"
        cancelText="Hủy"
        onCancel={onCancel}
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
            employees: '1'
          }}
        >
          <Form.Item
            name="title"
            label="Tên dự án"
            rules={[
              {
                required: true,
                message: 'Tên dự án không thể bỏ trống',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả dự án">
            <Input type="textarea" />
          </Form.Item>
          <Form.Item 
          name="employees" 
          label= "Số nhân viên tham gia"
          rules={[
            {
              required: true,
              message: 'Số nhân viên không thể bỏ trống',
            },
          ]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

export default ProjectCreateForm
