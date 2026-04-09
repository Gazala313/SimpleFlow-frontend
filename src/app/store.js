import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import projectReducer from "../features/projectSlice";
import taskReducer from "../features/taskSlice";
import userReducer from "../features/userSlice";
import adminReducer from "../features/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    tasks: taskReducer,
    users: userReducer,
    admin: adminReducer
  },
});
