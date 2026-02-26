import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const { TextArea } = Input;

function CreateTaskModal({ open, onClose, onCreate, owners, id }) {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        const values = await form.validateFields();
        const selectedUser = owners.find(u => u.id === values.owner_id);
        const payload = {
            title: values.title,
            description: values.description,
            due_date: values.due_date.format("YYYY-MM-DD"),
            owner_id: values.owner_id,
            role_id: selectedUser.role_id,
            project_id: id,
            status: values.status
        };

        onCreate(payload);
        form.resetFields();
    };

    return (
        <Modal
            title="Create Task"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Please enter title" }]}
                >
                    <Input placeholder="Enter task title" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <TextArea rows={3} placeholder="Enter description" />
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: "Select Status" }]}
                >
                    <Select placeholder="Select Status">
                        <Select.Option value="To Do">To Do</Select.Option>
                        <Select.Option value="In Progress">In Progress</Select.Option>
                        <Select.Option value="Completed">Completed</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Due Date"
                    name="due_date"
                    rules={[{ required: true, message: "Select due date" }]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="Owner"
                    name="owner_id"
                    rules={[{ required: true, message: "Select owner" }]}
                >
                    <Select placeholder="Select owner"
                        onChange={(value) => {
                            const selectedUser = owners.find(u => u.id === value);
                            form.setFieldsValue({
                                owner_role: selectedUser.role_id
                            });
                        }}>
                        {owners?.map((user) => (
                            <Select.Option key={user.id} value={user.id}>
                                {user.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Button
                    type="primary"
                    block
                    onClick={handleSubmit}
                >
                    Add Task
                </Button>
            </Form>
        </Modal>
    );
}

export default CreateTaskModal;
