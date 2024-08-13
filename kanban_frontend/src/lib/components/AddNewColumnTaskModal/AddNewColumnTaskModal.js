import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";

import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import { getTasksColumns } from "../../../app/features/taskColumnsSlice";

import kanbanService from "../../../service/kanbanService";

const AddNewColumnTaskModal = ({
  mode,
  openAddColumn,
  setOpenAddColumn,
  setNewColumnTask,
  newColumntTask,
  boardSelected,
  boardSelectedName,
}) => {
  const [columnTaskName, setColumnTaskName] = useState({
    taskColumnName: "",
    board: {
      boardName: "",
      id: null,
    },
  });

  const dispatch = useDispatch();

  function updateForm(value) {
    return setColumnTaskName((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    updateForm({
      board: {
        boardName: `${boardSelectedName}`,
        id: parseInt(boardSelected),
      },
    });
  }, [boardSelected, boardSelectedName]);

  const handleClose = () => {
    setOpenAddColumn(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 180,
    p: 6,
    display: "flex",
    justifyContent: "space-between",
  };
  const CreateButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#55BCC9",
    borderRadius: "0px",
    border: "none",
    "&:hover": {
      backgroundColor: "#659DBD",
    },
  }));

  return (
    <Modal open={openAddColumn} onClose={handleClose}>
      <Stack
        direction="column"
        gap="10px"
        bgcolor={mode === "light" ? "white" : "#252525"}
        sx={style}
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          fontWeight={600}
          color="text.primary"
        >
          New column
        </Typography>
        <Typography color="text.primary">Board: {boardSelectedName}</Typography>
        <form
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={(e) => {
            kanbanService
              .saveTaskColumn(columnTaskName)
              .then((res) => {
                toast.success(`New column created`, {
                  position: "bottom-right",
                });
                dispatch(getTasksColumns(boardSelected));
              })
              .catch((e) => {
                toast.error(`Column with this name already exists`, {
                  position: "bottom-right",
                });
              });
            handleClose();
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            label="Name"
            variant="outlined"
            onChange={(e) => updateForm({ taskColumnName: e.target.value })}
          />
          <CreateButton type="submit">
            <Typography>+Create</Typography>
          </CreateButton>
        </form>
      </Stack>
    </Modal>
  );
};

export default AddNewColumnTaskModal;
