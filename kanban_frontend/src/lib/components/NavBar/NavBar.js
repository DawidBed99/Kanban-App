import { AppBar, Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import AddNewTask from "../AddNewTask/AddNewTask";
import AddNewColumnTaskModal from "../AddNewColumnTaskModal/AddNewColumnTaskModal";

import kanbanService from "../../../service/kanbanService";
import { useSelector } from "react-redux";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#55BCC9",
  "&:hover": {
    backgroundColor: "#659DBD",
  },
}));

const NavBar = ({
  mode,
  newColumntTask,
  setNewColumnTask,
  boardSelected,
  boardSelectedName,
  newTask,
  setNewTask,
  edited,
}) => {
  const [open, setOpen] = useState(false);
  const [openAddColumn, setOpenAddColumn] = useState(false);
  const [status, setStatus] = useState("");

  const tasksColumnsGet = useSelector((state) => state.taskColumns);

  useEffect(() => {
    setStatus("");
  }, [boardSelected]);

  return (
    <AppBar
      position="sticky"
      sx={{
        color: mode === "light" ? "black" : "white",
        boxShadow: "none",
        display: { xs: "none", md: "block" },
        bgcolor: mode === "light" ? "white" : "#252525",
        padding: "24px",
        borderBottom: "#b6b5b5 1px solid",
        height: "80px",
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Typography variant="h4" fontWeight="600">
          {boardSelectedName}
        </Typography>

        <Stack direction="row" gap="10px">
          <ColorButton
            disabled={tasksColumnsGet.tasks.length < 1 ? true : false}
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              borderRadius: "0px",
              padding: "8px 10px",
              display: boardSelected === "" ? "none" : "",
            }}
            onClick={() => setOpen(true)}
          >
            +Add new task
          </ColorButton>{" "}
          <ColorButton
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              borderRadius: "0px",
              padding: "8px 10px",
              display: boardSelected === "" ? "none" : "",
            }}
            onClick={() => setOpenAddColumn(true)}
          >
            +Add new column
          </ColorButton>
        </Stack>
      </Stack>
      <AddNewTask
        disabled
        open={open}
        setOpen={setOpen}
        mode={mode}
        status={status}
        setStatus={setStatus}
        newTask={newTask}
        setNewTask={setNewTask}
      />
      <AddNewColumnTaskModal
        mode={mode}
        openAddColumn={openAddColumn}
        setOpenAddColumn={setOpenAddColumn}
        setNewColumnTask={setNewColumnTask}
        newColumntTask={newColumntTask}
        boardSelected={boardSelected}
        boardSelectedName={boardSelectedName}
      />
    </AppBar>
  );
};

export default NavBar;
