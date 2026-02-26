import { Modal, Form, Input, Select, Button } from "antd";
import { useState } from "react";

function CreateUserModal({ open, onClose, onCreate, roles }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const payload = {
                name: values.name,
                email: values.email,
                azure_id: values.email, // same as your logic
                role_id: values.role_id
            };

            await onCreate(payload);

            form.resetFields();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Create User"
            open={open}
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
            footer={null}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter name" }]}
                >
                    <Input placeholder="Enter user name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter email" },
                        { type: "email", message: "Enter valid email" }
                    ]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role_id"
                    rules={[{ required: true, message: "Select role" }]}
                >
                    <Select placeholder="Select role">
                        {roles?.map((role) => (
                            <Select.Option key={role.id} value={role.id}>
                                {role.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Button
                    type="primary"
                    block
                    loading={loading}
                    onClick={handleSubmit}
                >
                    Create User
                </Button>
            </Form>
        </Modal>
    );
}

export default CreateUserModal;
