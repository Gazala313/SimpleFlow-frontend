import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  app_access: [],
  loading: true
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    fetchAdminStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAdminData: (state, action) => {
      const data = action.payload;  // data from API (your JSON)

      state.id = data.id;
      state.email = data.email;
      state.app_access = data.app_access || [];

      state.loading = false;
    },

    clearAdminData: (state) => {
      state.id = null;
      state.email = null;
      state.app_access = [];
      state.loading = false;
    },

    finishLoading: (state) => {
      state.loading = false;
    }
  }
});

export const {fetchAdminStart, setAdminData, clearAdminData, finishLoading } = adminSlice.actions;
export default adminSlice.reducer;
