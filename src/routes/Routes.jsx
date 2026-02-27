import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import ProjectPage from "../pages/ProjectPage";
import UsersPage from "../pages/UsersPage";
import TaskCard from "../components/TaskCard";
import { Spin } from "antd";
import { useMsal } from "@azure/msal-react";
import AuthCallback from "../pages/AuthCallback";

const SuspenseWrapper = ({ children }) => (
    <Suspense fallback={<Spin fullscreen />}>{children}</Suspense>
);

export default function Routes() {
    const { accounts, inProgress } = useMsal();
    if (inProgress !== "none") {
        return <Spin fullscreen />;
    }
    const routes = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={accounts.length > 0 ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={
                        <SuspenseWrapper>
                            <Dashboard />
                        </SuspenseWrapper>} />

                    <Route path="/projects" element={<SuspenseWrapper>
                        <ProjectPage />
                    </SuspenseWrapper>} />
                    <Route path="/users" element={<SuspenseWrapper>
                        <UsersPage />
                    </SuspenseWrapper>} />
                    <Route path="/tasklist/:id" element={<SuspenseWrapper>
                        <TaskCard />
                    </SuspenseWrapper>} />
                </Route>

            </>

        )
    );
    return <RouterProvider router={routes} />;
}

