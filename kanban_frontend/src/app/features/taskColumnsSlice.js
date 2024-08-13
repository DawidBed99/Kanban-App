import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  tasks: [],
  status: "pending",
  loading: true,
  editClick: null,
};
export const getTasksColumns = createAsyncThunk(
  "tasks/getTasksColumns ",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8080/tasksColumns/specTask/${id}`
    );

    return response?.data;
  }
);

const taskColumnsSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    editClicked(state, action) {
      state.editClick = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasksColumns.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getTasksColumns.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks = action.payload;
    });
    builder.addCase(getTasksColumns.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default taskColumnsSlice.reducer;
export const { editClicked } = taskColumnsSlice.actions;
