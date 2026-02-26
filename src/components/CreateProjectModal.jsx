import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";

const { TextArea } = Input;

function CreateProjectModal({ open, onClose, onCreate }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const payload = {
                name: values.name,
                description: values.description
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
            title="Create Project"
            open={open}
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
            footer={null}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Project Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter project name" }]}
                >
                    <Input placeholder="Enter project name" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "Please enter description" }]}
                >
                    <TextArea rows={4} placeholder="Enter project description" />
                </Form.Item>

                <Button
                    type="primary"
                    block
                    loading={loading}
                    onClick={handleSubmit}
                >
                    Create Project
                </Button>
            </Form>
        </Modal>
    );
}

export default CreateProjectModal;
