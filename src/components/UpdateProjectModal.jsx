import { Modal, Form, Input, Button } from "antd";
import { useEffect, useState } from "react";

const { TextArea } = Input;

function UpdateProjectModal({ open, onClose, onUpdate, project }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (project) {
            form.setFieldsValue({
                name: project.name,
                description: project.description,
            });
        }
    }, [project, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const payload = {
                name: values.name,
                description: values.description,
            };

            await onUpdate(project.id, payload);

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
            title="Update Project"
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
                    Update Project
                </Button>
            </Form>
        </Modal>
    );
}

export default UpdateProjectModal;
