import React, { useState } from "react";

import { Button, Modal, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import { toast } from "react-toastify";

// import { useNavigate } from "react-router-dom";

import { saveBoard } from "../../../app/features/boardSlice";

import kanbanService from "../../../service/kanbanService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 180,
  p: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // borderRadius: "12px",
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

const NewBoardModal = ({ open, setOpen, mode, setNewPro }) => {
  const [name, setName] = useState({
    boardName: "",
  });

  function updateForm(value) {
    return setName((prev) => {
      return { ...prev, ...value };
    });
  }

  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack
        direction="column"
        bgcolor={mode === "light" ? "white" : "#252525"}
        sx={style}
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          fontWeight={600}
          color="text.primary"
        >
          New Board
        </Typography>
        <form
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={() => {
            kanbanService
              .saveBoard(name)
              .then((res) => {
                toast.success(`New project created`, {
                  position: "bottom-right",
                });
                setNewPro(true);
              })
              .catch((e) => {
                console.log(e);
                toast.error(`Project with this name already exists`, {
                  position: "bottom-right",
                });
              });

            handleClose();

            // window.location.reload();
          }}
        >
          <TextField
            sx={{ width: "95%" }}
            label="Name"
            variant="outlined"
            onChange={(e) => updateForm({ boardName: e.target.value })}
          />
          <CreateButton type="submit">
            <Typography>+Create</Typography>
          </CreateButton>
        </form>
      </Stack>
    </Modal>
  );
};

export default NewBoardModal;
