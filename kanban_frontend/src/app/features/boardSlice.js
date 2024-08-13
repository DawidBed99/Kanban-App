import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  projects: [],
  status: "pending",
  editClick: null,
  wasEdited: false,
  boardActive: "",
};
export const getBoards = createAsyncThunk("boards/getBoards", async () => {
  const response = await axios.get("http://localhost:8080/boards");

  return response?.data;
});

// export const getSingleBoard = createAsyncThunk(
//   "boards/getSingleBoard",
//   async (id) => {
//     const response = await axios.get(`http://localhost:8080/boards/${id}`);
//     console.log(response);
//     return response?.data;
//   }
// );

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    editClickedBoard(state, action) {
      state.editClick = action.payload;
    },
    wasEditedClick(state, action) {
      state.wasEdited = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.status = "success";
      state.projects = action.payload;
    });
    builder.addCase(getBoards.rejected, (state, action) => {
      state.status = "rejected";
    });
    // builder.addCase(getSingleBoard.fulfilled, (state, action) => {
    //   state.boardActive = action.payload;
    // });
  },
});

export default boardSlice.reducer;
export const { editClickedBoard } = boardSlice.actions;
