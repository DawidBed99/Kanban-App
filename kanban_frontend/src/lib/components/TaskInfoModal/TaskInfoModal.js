import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { useSelector, useDispatch } from "react-redux";

import Divider from "@mui/material/Divider";

import CloseIcon from "@mui/icons-material/Close";

import kanbanService from "../../../service/kanbanService";

import { toast } from "react-toastify";

import EditIcon from "@mui/icons-material/Edit";

import { getTasksColumns } from "../../../app/features/taskColumnsSlice";

import { getTaskData } from "../../../app/features/singleTaskSlice";
import { useState } from "react";

const TaskInfoModal = ({
  mode,
  openTaskInfo,
  setOpenTaskInfo,
  boardSelected,
  taskDeleted,
  setTaskDeleted,
  nameOfTaskColumn,
  status,
  setStatus,
  setNameOfTaskColumn,
}) => {
  const getTask = useSelector((state) => state.taskData);
  const tasksColumnsGet = useSelector((state) => state.taskColumns);

  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [editingTaskColumn, setEditingTaskColumn] = useState(false);
  const [wasEdited, setWasEdited] = useState(false);

  const handleClose = () => {
    setOpenTaskInfo(false);
    setNameOfTaskColumn("");
    setStatus("");
    updateFormTaskColumn({
      taskColumn: {
        taskColumnName: "",
        id: "",
      },
    });
    setEditing(false);
    if (wasEdited === true) {
      dispatch(getTasksColumns(boardSelected));
    }

    setWasEdited(false);
  };

  const [editedTaskName, setEditedTaskName] = useState({
    taskName: "",
  });
  const [editedTaskDesc, setEditedTaskDesc] = useState({
    taskDesc: "",
  });
  const [editedTaskColumn, setEditedTaskColumn] = useState({
    taskColumn: {
      taskColumnName: "",
      id: "",
    },
  });

  function updateForm(value) {
    return setEditedTaskName((prev) => {
      return { ...prev, ...value };
    });
  }
  function updateFormDesc(value) {
    return setEditedTaskDesc((prev) => {
      return { ...prev, ...value };
    });
  }
  function updateFormTaskColumn(value) {
    return setEditedTaskColumn((prev) => {
      return { ...prev, ...value };
    });
  }

  function handleSubmit(e, id) {
    e.preventDefault();

    if (editing === true) {
      if (
        editedTaskName.taskName.length < 1 ||
        editedTaskName.taskName === getTask.data.taskName
      ) {
        toast.warning(`Task name can not be the same or empty!`, {
          position: "bottom-right",
        });
        setEditing(false);
      } else {
        kanbanService
          .editTaskName(id, editedTaskName)
          .then((response) => {
            if (response.status === 200) {
              setEditing(false);
              dispatch(getTaskData(getTask.data.id));
              setWasEdited(true);
            }
          })
          .then(() => {
            toast.warning(`Name has been changed`, {
              position: "bottom-right",
            });
          });
      }
    }
    if (editingDesc === true) {
      if (
        editedTaskDesc.taskDesc.length < 1 ||
        editedTaskDesc.taskDesc === getTask.data.taskDesc
      ) {
        toast.warning(`Task description can not be the same or empty!`, {
          position: "bottom-right",
        });
        setEditingDesc(false);
      } else {
        kanbanService
          .editTaskDesc(id, editedTaskDesc)
          .then((response) => {
            if (response.status === 200) {
              setEditingDesc(false);
              dispatch(getTaskData(getTask.data.id));
              setWasEdited(true);
            }
          })
          .then(() => {
            toast.warning(`Description has been changed`, {
              position: "bottom-right",
            });
          });
      }
    }
    if (editingTaskColumn === true) {
      kanbanService
        .editTaskColumnForTask(id, editedTaskColumn)
        .then((response) => {
          if (response.status === 200) {
            setEditingDesc(false);

            dispatch(getTaskData(id));
            setWasEdited(true);
            kanbanService.getNameOfTaskColumn(id).then((response) => {
              if (response.status === 200) {
                setNameOfTaskColumn(response.data);
              }
            });
          }
        })
        .then(() => {
          toast.warning(`Task Column has been changed`, {
            position: "bottom-right",
          });
        });
    }
  }

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    p: 6,
    display: "flex",
    alignItems: "left",
    gap: "20px",
    height: "80%",
    outline: "none",
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
    setEditingTaskColumn(true);
    updateFormTaskColumn({
      taskColumn: {
        taskColumnName: e.target.value.taskColumnName,
        id: e.target.value.id,
      },
    });
  };

  return (
    <Modal open={openTaskInfo} onClose={handleClose}>
      {getTask.status === "pending" ? (
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 6,
            display: "flex",
            alignItems: "center",
            gap: "14px",
            height: "80%",
          }}
          bgcolor={mode === "light" ? "white" : "#252525"}
        ></Stack>
      ) : (
        <Stack sx={styleModal} bgcolor={mode === "light" ? "white" : "#252525"}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height="51px"
          >
            {editing === false ? (
              <Typography
                color="text.primary"
                id="modal-modal-title"
                fontWeight="bold"
                fontSize="32px"
              >
                {getTask?.data.taskName}
              </Typography>
            ) : (
              <form
                onSubmit={(e) => {
                  handleSubmit(e, getTask.data.id);
                }}
              >
                <TextField
                  variant="standard"
                  defaultValue={getTask.data.taskName}
                  inputProps={{
                    style: {
                      fontSize: "32px",
                      fontWeight: "bold",
                      height: "40px",
                    },
                  }}
                  onChange={(e) =>
                    updateForm({
                      id: getTask.data.id,
                      taskName: e.target.value,
                    })
                  }
                ></TextField>
              </form>
            )}
            {editing === true ? (
              <Stack direction="row">
                <IconButton
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  <CloseIcon
                    sx={{ color: mode === "light" ? "#252525" : "white" }}
                  />
                </IconButton>
              </Stack>
            ) : (
              <Stack direction="row">
                <IconButton onClick={() => setEditing(true)}>
                  <EditIcon
                    sx={{ color: mode === "light" ? "#252525" : "white" }}
                  />
                </IconButton>

                <IconButton
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleClose();
                    kanbanService
                      .deleteTask(getTask.data.id)
                      .then((response) => {
                        if (response.status === 200) {
                          setTaskDeleted(!taskDeleted);
                        }
                      })
                      .then(() => {
                        toast.error(`Task has been deleted`, {
                          position: "bottom-right",
                        });
                      });
                  }}
                >
                  <DeleteIcon sx={{ fontSize: "28px" }} />
                </IconButton>
              </Stack>
            )}
          </Stack>

          <Divider sx={{ bgcolor: "#55BCC9" }} />
          <Stack direction="column" alignItems="flex-start" gap="20px">
            <Typography color="text.primary" fontSize="18px">
              Created at: <b>{getTask?.data.dateOfCreate}</b>
            </Typography>
            <Typography color="text.primary" fontSize="18px">
              Column: <strong>{nameOfTaskColumn}</strong>
            </Typography>
            <form
              onSubmit={(e) => {
                handleSubmit(e, getTask.data.id);
              }}
            >
              <Stack direction="row" gap="10px" alignItems="center">
                <Select
                  sx={{
                    fontSize: "16px",
                    width: "100px",
                    height: "50px",
                    padding: "0px",
                  }}
                  value={status}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem disabled value="">
                    {nameOfTaskColumn}
                  </MenuItem>
                  {tasksColumnsGet.tasks.map((item) => {
                    return (
                      <MenuItem
                        key={item.id}
                        value={item}
                        sx={{
                          fontSize: "16px",
                          display:
                            item.taskColumnName === nameOfTaskColumn
                              ? "none"
                              : "",
                        }}
                      >
                        {item.taskColumnName}
                      </MenuItem>
                    );
                  })}
                </Select>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    height: "36px",
                    fontSize: "18px",
                    bgcolor: "#55BCC9",
                    color: "white",
                  }}
                >
                  Save
                </Button>
              </Stack>
            </form>
          </Stack>

          <Divider sx={{ bgcolor: "#55BCC9" }} />
          <Stack>
            <Stack direction="row" alignItems="center">
              <Typography color="text.primary" variant="h5" fontWeight="bold">
                Descripition
              </Typography>
              <IconButton onClick={() => setEditingDesc(true)}>
                <EditIcon
                  sx={{ color: mode === "light" ? "#252525" : "white" }}
                />
              </IconButton>
            </Stack>
            {editingDesc === false ? (
              <Typography
                color="text.primary"
                id="modal-modal-description"
                sx={{ mt: 2, fontSize: "20px" }}
              >
                {getTask?.data.taskDesc}
              </Typography>
            ) : (
              <form
                onSubmit={(e) => {
                  handleSubmit(e, getTask.data.id);
                }}
              >
                <Stack direction="row" alignItems="center">
                  <TextField
                    variant="standard"
                    defaultValue={getTask.data.taskDesc}
                    sx={{ mt: 2 }}
                    inputProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                        height: "23px",
                        fontWeight: "500",
                      },
                    }}
                    onChange={(e) =>
                      updateFormDesc({
                        id: getTask.data.id,
                        taskDesc: e.target.value,
                      })
                    }
                  ></TextField>
                  <IconButton
                    onClick={() => {
                      setEditingDesc(false);
                    }}
                  >
                    <CloseIcon
                      sx={{ color: mode === "light" ? "#252525" : "white" }}
                    />
                  </IconButton>
                </Stack>
              </form>
            )}
          </Stack>
        </Stack>
      )}
    </Modal>
  );
};

export default TaskInfoModal;
