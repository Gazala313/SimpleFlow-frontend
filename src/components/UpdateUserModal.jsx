import { Modal, Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";

function UpdateUserModal({ open, onClose, onUpdate, user, roles }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                email: user.email,
                role_id: user.role_id,
            });
        }
    }, [user, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const payload = {
                name: values.name,
                email: values.email,
                azure_id: values.email, // keeping same logic
                role_id: values.role_id,
            };

            await onUpdate(user.id, payload);

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
            title="Update User"
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
                        { type: "email", message: "Enter valid email" },
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
                    Update User
                </Button>
            </Form>
        </Modal>
    );
}

export default UpdateUserModal;
