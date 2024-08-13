import { configureStore } from "@reduxjs/toolkit";
import taskColumnsSlice from "./features/taskColumnsSlice";
import boardSlice from "./features/boardSlice";
import singleTaskSlice from "./features/singleTaskSlice";

const store = configureStore({
  reducer: {
    taskColumns: taskColumnsSlice,
    boards: boardSlice,
    taskData: singleTaskSlice,
  },
});

export default store;
