import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

const { TextArea } = Input;

function UpdateTaskModal({ open, onClose, onUpdate, owners, task }) {
  const [form] = Form.useForm();

  // ✅ Pre-fill form when task changes
  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        due_date: task.due_date ? dayjs(task.due_date) : null,
        owner_id: task.owner_id,
        status: task.status
      });
    }
  }, [task, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    const selectedUser = owners.find(
      (u) => u.id === values.owner_id
    );

    const payload = {
      id: task.id,
      title: values.title,
      description: values.description,
      due_date: values.due_date.format("YYYY-MM-DD"),
      owner_id: values.owner_id,
      role_id: selectedUser?.role_id,
      status:values.status
    };

    onUpdate(payload);
    form.resetFields();
  };

  return (
    <Modal
      title="Update Task"
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea rows={3} />
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
          <Select placeholder="Select owner">
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
          Update Task
        </Button>
      </Form>
    </Modal>
  );
}

export default UpdateTaskModal;
