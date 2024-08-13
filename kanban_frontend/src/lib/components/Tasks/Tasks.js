import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

import styled from "@emotion/styled";

import { useSelector, useDispatch } from "react-redux";

import CircleIcon from "@mui/icons-material/Circle";

import useScreenSize from "../../../customHooks/useScreenSize";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  editClicked,
  getTasksColumns,
} from "../../../app/features/taskColumnsSlice";

import { getTaskData } from "../../../app/features/singleTaskSlice";

import { toast } from "react-toastify";

import { useEffect, useState, useRef } from "react";

import CloseIcon from "@mui/icons-material/Close";

import EditIcon from "@mui/icons-material/Edit";

import kanbanService from "../../../service/kanbanService";

import randomColor from "randomcolor";

import TaskInfoModal from "../TaskInfoModal/TaskInfoModal";

export default function Tasks({
  mode,
  newColumntTask,
  setHeight,
  boardSelected,
  newTask,
}) {
  const dispatch = useDispatch();
  const tasksColumnsGet = useSelector((state) => state.taskColumns);

  const [taskDeleted, setTaskDeleted] = useState(false);

  const screenSize = useScreenSize();
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  });

  const [colors, setColors] = useState([]);

  const [nameOfTaskColumn, setNameOfTaskColumn] = useState([]);

  const [openTaskInfo, setOpenTaskInfo] = useState(false);

  const handleTaskClick = (id) => {
    dispatch(getTaskData(id));
  };

  useEffect(() => {
    const colorsArray = [];
    for (let i = 0; i < tasksColumnsGet.tasks.length; i++) {
      var someColor = randomColor();

      colorsArray.push(someColor);
    }
    setColors(colorsArray);
  }, [tasksColumnsGet.tasks.length]);

  const [edited, setEdited] = useState(false);

  const [editedTaskColumn, setEditedTaskColumn] = useState({
    taskColumnName: " ",
    id: "",
  });

  function updateForm(value) {
    return setEditedTaskColumn((prev) => {
      return { ...prev, ...value };
    });
  }

  const [status, setStatus] = useState(nameOfTaskColumn);

  useEffect(() => {
    dispatch(getTasksColumns(boardSelected));
  }, [newColumntTask, boardSelected, newTask, taskDeleted]);

  function handleSubmit(e, id) {
    e.preventDefault();

    kanbanService
      .editTaskColumn(id, editedTaskColumn)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getTasksColumns(boardSelected));
          dispatch(editClicked(null));
        }
      })
      .then(() => {
        toast.warning(`Name has been changed`, {
          position: "bottom-right",
        });
      })
      .then(setEdited(!edited));
  }

  const style2 = {
    display: "flex",
    justifyContent: tasksColumnsGet.tasks.length > 0 ? "left" : "center",
    padding: "0px 30px 30px 30px",
    overflowX: "scroll",

    "&::-webkit-scrollbar": {
      height: width >= screenSize.width - 300 ? "12px" : "0px",
    },

    "&::-webkit-scrollbar-thumb": {
      background: mode === "light" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.4)",
    },
    "&::-webkit-scrollbar-track": {
      background: mode === "light" ? "rgba(0,0,0,0.2)" : "white",
    },
  };

  const TaskButton = styled(Button)(() => ({
    backgroundColor: mode === "light" ? "white" : "#252525",
    borderRadius: "0px",
    boxShadow: "2px solid black",
    color: mode === "light" ? "black" : "white",
    "&:hover": {
      backgroundColor: mode === "light" ? "white" : "#252525",
      boxShadow:
        mode === "light" ? "0px 0px 0px 1px #252525" : "0px 0px 0px 1px white",
    },
  }));
  const EditButton = styled(IconButton)(() => ({
    width: "40px",
    borderRadius: "0px",
    boxShadow: "none",
    color: mode === "light" ? "black" : "white",
    "&:hover": {
      boxShadow: "none",
      background: "none",
    },
  }));

  let k = -1;
  const taskList = tasksColumnsGet.tasks.map((item) => {
    k++;
    return (
      <Stack
        direction="column"
        sx={{
          gap: "20px",
        }}
        key={item.id}
        minWidth="300px"
      >
        <Stack
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            gap: "6px",
            minHeight: "40px",
          }}
        >
          <CircleIcon
            sx={{
              color: colors[k],
              fontSize: "16px",
            }}
          />

          {tasksColumnsGet.editClick === item.id ? (
            <Box>
              <form
                onSubmit={(e) => {
                  handleSubmit(e, item.id);
                }}
              >
                <TextField
                  variant="standard"
                  defaultValue={item.taskColumnName}
                  onChange={(e) =>
                    updateForm({ id: item.id, taskColumnName: e.target.value })
                  }
                ></TextField>
              </form>
            </Box>
          ) : (
            <Typography>
              <strong>
                {item.taskColumnName} ({item.task.length})
              </strong>
            </Typography>
          )}
          {tasksColumnsGet.editClick === item.id ? (
            <IconButton
              onClick={() => {
                dispatch(editClicked(null));
              }}
            >
              <CloseIcon
                sx={{ color: mode === "light" ? "#252525" : "white" }}
              />
            </IconButton>
          ) : (
            <Stack direction="row">
              <EditButton
                sx={{ padding: "0" }}
                onClick={() => {
                  dispatch(editClicked(item.id));
                }}
              >
                <EditIcon
                  sx={{ color: mode === "light" ? "#252525" : "white" }}
                />
              </EditButton>
              <EditButton
                onClick={() => {
                  kanbanService.deleteTaskColumn(item.id).then(() => {
                    dispatch(getTasksColumns(boardSelected));
                    toast.error(`Column has been deleted`, {
                      position: "bottom-right",
                    });
                  });
                }}
              >
                <DeleteIcon
                  sx={{ color: mode === "light" ? "#252525" : "white" }}
                />
              </EditButton>
            </Stack>
          )}
        </Stack>

        <Stack direction="column" gap="16px">
          {item.task.map((task) => {
            return (
              <TaskButton
                variant="contained"
                sx={{
                  width: "300px",
                  minHeight: "80px",
                  display: "flex",
                  justifyContent: "start",
                }}
                key={task.id}
                onClick={() => {
                  setOpenTaskInfo(true);
                  handleTaskClick(task.id);
                  kanbanService
                    .getNameOfTaskColumn(task.id)
                    .then((response) => {
                      if (response.status === 200) {
                        setNameOfTaskColumn(response.data);
                      }
                    });
                }}
              >
                <Stack
                  direction="column"
                  sx={{ display: "flex", alignItems: "start" }}
                >
                  <Typography
                    textTransform="none"
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    {task.taskName}
                  </Typography>

                  <Typography
                    textTransform="none"
                    sx={{
                      textAlign: "left",
                      fontSize: "16px",
                      textOverflow: "ellipsis",
                      display: "inline-block",
                      width: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden !important",
                    }}
                  >
                    {task.taskDesc}
                  </Typography>
                </Stack>
              </TaskButton>
            );
          })}
        </Stack>
      </Stack>
    );
  });

  return (
    <Box sx={style2}>
      {tasksColumnsGet.status === "pending" ? (
        <Box
          ref={ref}
          sx={{
            width: "100%",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <CircularProgress />
          <Typography variant="h4">Loading...</Typography>
        </Box>
      ) : (
        <Box>
          {tasksColumnsGet.tasks.length > 0 ? (
            <Box
              ref={ref}
              sx={{
                marginTop: "30px",
                display: "flex",
                gap: "30px",
              }}
            >
              {taskList}
              <TaskInfoModal
                mode={mode}
                openTaskInfo={openTaskInfo}
                setOpenTaskInfo={setOpenTaskInfo}
                boardSelected={boardSelected}
                taskDeleted={taskDeleted}
                setTaskDeleted={setTaskDeleted}
                nameOfTaskColumn={nameOfTaskColumn}
                status={status}
                setStatus={setStatus}
                setNameOfTaskColumn={setNameOfTaskColumn}
              />
            </Box>
          ) : (
            <Box
              ref={ref}
              sx={{
                marginTop: "150px",
              }}
            >
              <Typography variant="h3">
                There are no tasks in this project!
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
