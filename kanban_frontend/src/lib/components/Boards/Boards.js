import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import Toc from "@mui/icons-material/Toc";

import kanbanService from "../../../service/kanbanService";

import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";

import { useSelector, useDispatch } from "react-redux";

import { getBoards } from "../../../app/features/boardSlice";

import { toast } from "react-toastify";

import { editClickedBoard } from "../../../app/features/boardSlice";

import CloseIcon from "@mui/icons-material/Close";

const LeftBarButton = styled(Button)(({ theme }) => ({
  color: "black",

  "&:hover": {
    backgroundColor: "#55BCC9",
  },
}));

const Boards = ({
  newPro,
  setNewPro,
  mode,
  setBoardSelected,
  boardSelected,
  setBoardSelectedName,
  boardSelectedName,
  edited,
  setEdited,
}) => {
  const boardsGet = useSelector((state) => state.boards);

  const dispatch = useDispatch();

  const [newBoardName, setNewBoardName] = useState({
    boardName: "",
  });

  useEffect(() => {
    dispatch(getBoards());
    setNewPro(false);
  }, [newPro]);

  function updateForm(value) {
    return setNewBoardName((prev) => {
      return { ...prev, ...value };
    });
  }

  function handleSubmit(e, id) {
    e.preventDefault();

    for (let i = 0; i < boardsGet.projects.length; i++) {
      if (
        boardsGet.projects[i].boardName === newBoardName.boardName ||
        newBoardName.boardName.length < 1
      ) {
        toast.warning(`Board name can not be the same or empty!`, {
          position: "bottom-right",
        });
        dispatch(editClickedBoard(null));
        break;
      } else {
        kanbanService
          .editBoard(id, newBoardName)
          .then((response) => {
            if (response.status === 200) {
              kanbanService
                .getSingleBoard(boardsGet.editClick)
                .then((response) => {
                  if (response.status === 200) {
                    setBoardSelectedName(response.data.boardName);
                    dispatch(getBoards());
                  }
                });
            }
          })
          .then(() => {
            toast.success(`Board name has been changed`, {
              position: "bottom-right",
            });
          })
          .then(setEdited(!edited));
        break;
      }
    }

    setTimeout(() => {
      dispatch(editClickedBoard(null));
    }, 100);
  }

  const list = boardsGet?.projects.map((item) => {
    return (
      <Stack
        direction="row"
        sx={{
          width: "100%",
          justifyContent: "left",
          height: "36px",
          alignItems: "center",
        }}
        key={item.id}
      >
        {boardsGet.editClick === item.id ? (
          <Stack
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              ml: "8px",
            }}
          >
            <Toc sx={{ fontSize: "24px" }} />
            <form
              onSubmit={(e) => {
                handleSubmit(e, item.id);
              }}
            >
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  defaultValue={item.boardName}
                  sx={{ height: "26px", mr: "12px" }}
                  onChange={(e) =>
                    updateForm({ id: item.id, boardName: e.target.value })
                  }
                ></TextField>
              </Stack>
            </form>
          </Stack>
        ) : (
          <LeftBarButton
            key={item.id}
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "0px",
              borderTopLeftRadius: "0px",
              textAlign: "left",
              width: "100%",
              height: "36px",
              backgroundColor: boardSelected === item.id ? "#55BCC9" : "",
            }}
            onClick={() => {
              if (boardSelected === item.id) {
                setBoardSelected("");
                setBoardSelectedName("");
              } else {
                setBoardSelected(item.id);
                kanbanService.getSingleBoard(item.id).then((response) => {
                  if (response.status === 200) {
                    setBoardSelectedName(response.data.boardName);
                  }
                });
              }
            }}
          >
            <Toc sx={{ fontSize: "24px" }} />

            <Typography
              textTransform="none"
              sx={{
                fontSize: "16px",
                fontWeight: boardSelectedName === item.boardName ? "bold" : "",
              }}
            >
              {item.boardName}
            </Typography>
          </LeftBarButton>
        )}
        {boardsGet.editClick === item.id ? (
          <IconButton
            onClick={() => {
              dispatch(editClickedBoard(null));
            }}
            sx={{ padding: "2px" }}
          >
            <CloseIcon sx={{ color: mode === "light" ? "#252525" : "white" }} />
          </IconButton>
        ) : (
          <Stack direction="row">
            <IconButton
              sx={{ padding: "2" }}
              onClick={() => {
                dispatch(editClickedBoard(item.id));
              }}
            >
              <EditIcon
                sx={{
                  fontSize: "20px",
                  color: mode === "light" ? "#252525" : "white",
                }}
              />
            </IconButton>
            <IconButton
              sx={{ padding: "2" }}
              onClick={() => {
                kanbanService.deleteBoard(item.id).then(() => {
                  console.log(boardSelected);
                  if (item.id === boardSelected) {
                    setBoardSelected("");
                    setBoardSelectedName("");
                  }
                  dispatch(getBoards());
                  toast.error(`Board has been deleted`, {
                    position: "bottom-right",
                  });
                });
              }}
            >
              <DeleteIcon
                sx={{
                  fontSize: "20px",
                  color: mode === "light" ? "#252525" : "white",
                }}
              />
            </IconButton>
          </Stack>
        )}
      </Stack>
    );
  });
  return (
    <Stack direction="column" gap="12px">
      {list}
    </Stack>
  );
};

export default Boards;
