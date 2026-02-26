import { useEffect, useState } from "react";
import { fetchTasks } from "../features/taskSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import CreateTaskModal from "./CreateTaskModal";
import { fetchUsers } from "../features/userSlice";
import { newRole } from "../utils/commons";
import UpdateTaskModal from "./UpdateTaskModal";


const TaskCard = ({ task }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.tasks);
    const [open, setOpen] = useState(false);
    const usersList = useSelector((state) => state.users.list)
    const username = usersList.find(u => u.email === localStorage.getItem("username"))
    const userRole = newRole(username?.role_id)
    const [editOpen, setEditOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        if (id) dispatch(fetchTasks(id));
        dispatch(fetchUsers());
    }, [dispatch]);

    const newList = list.map((item) => ({
        ...item,
        owner: usersList.find(u => u.id === item.owner_id)?.name
    }));

    const handleCreateTask = async (data) => {
        await api.post("/tasks/", data);
        dispatch(fetchTasks(id));
        setOpen(false);
    };

    const thStyle = {
        padding: "12px",
        borderBottom: "2px solid #e5e7eb",
        fontWeight: "600",
    };

    const tdStyle = {
        padding: "12px",
    };


    const handleDeleteTask = async (task_id) => {
        try {
            await api.delete(`/tasks/${task_id}`);
            dispatch(fetchTasks(id));
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleUpdateTask = async (data) => {
        const newData = (({ id, ...rest }) => ({
            ...rest,
            project_id: id
        }))(data);
        console.log(newData)
        await api.put(`/tasks/${data.id}`, newData);
        dispatch(fetchTasks(id));
        setEditOpen(false);
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Task List</h1>

                {/* 🔥 Show only if admin */}
                {["Admin", "task_creator"].includes(userRole) && (
                    <button
                        style={{
                            padding: "8px 16px",
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            height: '30px'
                        }}
                        onClick={() => setOpen(true)}
                    >
                        + Add Task
                    </button>
                )}
            </div>
            <CreateTaskModal
                open={open}
                onClose={() => setOpen(false)}
                onCreate={handleCreateTask}
                owners={usersList}
                id={id}
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "white",
                }}
            >
                <thead>
                    <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
                        <th style={thStyle}>Task</th>
                        <th style={thStyle}>Discription</th>
                        <th style={thStyle}>Due Date</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Assigned to</th>
                        {["Admin", "task_creator"].includes(userRole) && (<th style={thStyle}>Actions</th>)}
                    </tr>
                </thead>

                <tbody>
                    {newList.map((user) => (
                        <tr key={user.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <td style={tdStyle}>{user.title}</td>
                            <td style={tdStyle}>{user.description}</td>
                            <td style={tdStyle}>{user.due_date}</td>
                            <td style={tdStyle}>{user.status}</td>
                            <td style={tdStyle}>{user.owner}</td>
                            {["Admin", "task_creator"].includes(userRole) && (
                                <td style={tdStyle}>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button
                                            onClick={() => {
                                                setSelectedTask(user);
                                                setEditOpen(true);
                                            }}
                                            style={{
                                                padding: "5px 10px",
                                                background: "#f59e0b",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDeleteTask(user.id)}
                                            style={{
                                                padding: "5px 10px",
                                                background: "#ef4444",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Delete
                                        </button>

                                        <UpdateTaskModal
                                            open={editOpen}
                                            onClose={() => setEditOpen(false)}
                                            onUpdate={handleUpdateTask}
                                            owners={usersList}
                                            task={selectedTask}
                                        />

                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default TaskCard;
