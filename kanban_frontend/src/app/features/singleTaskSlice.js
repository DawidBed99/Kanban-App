import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  data: [],
  status: "pending",
  loading: true,
  nameOfTaskColumn: "",
};
export const getTaskData = createAsyncThunk("tasks/getTaskData", async (id) => {
  const response = await axios.get(`http://localhost:8080/tasks/${id}`);
  return response?.data[0];
});

const singleTaskSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTaskData.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getTaskData.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(getTaskData.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default singleTaskSlice.reducer;
export const { editClicked } = singleTaskSlice.actions;
