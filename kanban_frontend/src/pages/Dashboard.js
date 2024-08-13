import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import NavBar from "../lib/components/NavBar/NavBar";

import NoBoard from "../lib/components/NoBoard/NoBoard";

import Tasks from "../lib/components/Tasks/Tasks";

import useScreenSize from "../customHooks/useScreenSize";

const Dashboard = ({
  mode,
  boardSelected,
  boardSelectedName,
  edited,
  setEdited,
}) => {
  const [newColumntTask, setNewColumnTask] = useState(false);
  const [newTask, setNewTask] = useState(false);

  const [height, setHeight] = useState(0);

  const screenSize = useScreenSize();

  const style2 = {
    bgcolor: mode === "light" ? "#E8F9FD" : "#131313",
    overflowY: "scroll",

    height: "100%",
    "&::-webkit-scrollbar": {
      width: height < screenSize.height - 120 ? "0px" : "10px",
    },

    "&::-webkit-scrollbar-thumb": {
      background: mode === "light" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.4)",
    },
    "&::-webkit-scrollbar-track": {
      background: mode === "light" ? "rgba(0,0,0,0.2)" : "white",
    },
  };

  return (
    <Box flex={5} sx={style2}>
      <Stack>
        <NavBar
          mode={mode}
          newColumntTask={newColumntTask}
          setNewColumnTask={setNewColumnTask}
          boardSelected={boardSelected}
          boardSelectedName={boardSelectedName}
          newTask={newTask}
          setNewTask={setNewTask}
          edited={edited}
          setEdited={setEdited}
        />
        {boardSelected === "" ? (
          <NoBoard />
        ) : (
          <Tasks
            setHeight={setHeight}
            mode={mode}
            newColumntTask={newColumntTask}
            newTask={newTask}
            boardSelected={boardSelected}
          />
        )}
      </Stack>
    </Box>
  );
};

export default Dashboard;
