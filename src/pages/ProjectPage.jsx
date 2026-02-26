import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../features/projectSlice";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import api from "../services/api";
import { Link } from "react-router-dom";
import { newRole } from "../utils/commons";
import CreateProjectModal from "../components/CreateProjectModal";
import UpdateProjectModal from "../components/UpdateProjectModal";

const ProjectPage = () => {
    const dispatch = useDispatch();
    const { instance, accounts } = useMsal();
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const { list, loading, error } = useSelector(
        (state) => state.projects
    );
    const username = useSelector((state) => state.users.list).find(u => u.email === localStorage.getItem("username"))


    const userRole = newRole(username?.role_id)
    useEffect(() => {
        const getTokenAndFetch = async () => {
            if (accounts.length > 0) {
                const response = await instance.acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0],
                });

                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.accessToken}`;

                dispatch(fetchProjects());
            }
        };
        getTokenAndFetch();
    }, [dispatch, instance, accounts]);

    const handleCreateProject = async (payload) => {
        try {
            const response = await api.post("/projects/", payload);
            dispatch(fetchProjects());
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            await api.delete(`/projects/${id}`);
            dispatch(fetchProjects()); // refresh list
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleUpdateProject = async (id, payload) => {
        try {
            await api.put(`/projects/${id}`, payload);

            dispatch(fetchProjects()); // refresh
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };



    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Projects</h1>

                {/* 🔥 Show only if admin */}
                {userRole === "Admin" && (
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
                        + Create Project
                    </button>
                )}
            </div>

            <CreateProjectModal
                open={open}
                onClose={() => setOpen(false)}
                onCreate={handleCreateProject}
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {list?.map((project) => (
                <div
                    key={project.id}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        border: "1px solid #ddd",
                        marginBottom: "10px",
                        borderRadius: "6px",
                        background: "white",
                    }}
                >
                    <div>
                        <strong><Link to={`/tasklist/${project.id}`}>{project.name}</Link></strong>
                        <p style={{ margin: 0 }}>{project.description}</p>
                    </div>
                    {userRole === "Admin" && (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                onClick={() => {
                                    setSelectedProject(project);
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

                            <UpdateProjectModal
                                open={editOpen}
                                onClose={() => setEditOpen(false)}
                                onUpdate={handleUpdateProject}
                                project={selectedProject}
                            />


                            <button
                                onClick={() => handleDeleteProject(project.id)}
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
                    )}
                </div>
            ))}

        </div>
    );
};

export default ProjectPage;
