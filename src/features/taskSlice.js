import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (projectId) => {
    const response = await api.get(`/tasks/project/${projectId}`);
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateTaskStatus: (state, action) => {
      const { taskId, status } = action.payload;
      const task = state.list.find((t) => t.id === taskId);
      if (task) task.status = status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
