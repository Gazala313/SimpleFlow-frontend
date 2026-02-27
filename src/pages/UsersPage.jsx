import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import api from "../services/api";
import { newRole } from "../utils/commons";
import CreateUserModal from "../components/CreateUserModal";
import UpdateUserModal from "../components/UpdateUserModal";

const UsersPage = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { list, loading, error } = useSelector((state) => state.users);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const username = useSelector((state) => state.users.list).find(u => u.email === localStorage.getItem("username"))


    const userRole = newRole(username?.role_id)

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleCreateUser = async (payload) => {
        try {
            const response = await api.post("/users/", payload);
            dispatch(fetchUsers());
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            dispatch(fetchUsers());
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleUpdateUser = async (id, payload) => {
        try {
            await api.put(`/users/${id}`, payload);
            dispatch(fetchUsers());
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const thStyle = {
        padding: "12px",
        borderBottom: "2px solid #e5e7eb",
        fontWeight: "600",
    };

    const tdStyle = {
        padding: "12px",
    };
    const roles = [{
        id: 1,
        name: "Admin"
    },
    {
        id: 2,
        name: "Read Only"
    },
    {
        id: 3,
        name: "Task Creater"
    }]


    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Users</h1>

                {/* 🔥 Show only if admin */}
                {userRole === "admin" && (
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
                        + Add User
                    </button>
                )}
            </div>
            <CreateUserModal
                open={open}
                onClose={() => setOpen(false)}
                onCreate={handleCreateUser}
                roles={roles}   // pass roles list here
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
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Role</th>
                        {userRole === "admin" && (<th style={thStyle}>Actions</th>)}
                    </tr>
                </thead>

                <tbody>
                    {list.map((user) => (
                        <tr key={user.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <td style={tdStyle}>{user.name}</td>
                            <td style={tdStyle}>{user.email}</td>
                            <td style={tdStyle}>{newRole(user.role_id)}</td>
                            {userRole === "admin" && (
                                <td style={tdStyle}>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user);
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

                                        <UpdateUserModal
                                            open={editOpen}
                                            onClose={() => setEditOpen(false)}
                                            onUpdate={handleUpdateUser}
                                            user={selectedUser}
                                            roles={roles}
                                        />


                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
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

export default UsersPage;
