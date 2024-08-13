import {
  Button,
  Stack,
  Typography,
  TextField,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";

import { styled } from "@mui/material/styles";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import kanbanService from "../../../service/kanbanService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 6,
  display: "flex",
  alignItems: "left",
  gap: "14px",
  height: "80%",
};

const style2 = {
  overflowY: "scroll",
  overflowX: "hidden",
  paddingBottom: "5px",
  "&::-webkit-scrollbar": {
    width: "0px",
  },
};

const CreateButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#55BCC9",
  borderRadius: "0px",
  border: "none",
  boxShadow: "none",
  fontSize: "18px",
  "&:hover": {
    backgroundColor: "#659DBD",
    boxShadow: "none",
  },
}));

// const DeleteButton = styled(Button)(({ theme }) => ({
//   color: "white",
//   backgroundColor: "rgb(255,36,0)",
//   minWidth: "32px",
//   minHeight: "36px",
//   padding: "4px",
//   borderRadius: "0px",
//   border: "none",
//   boxShadow: "none",
//   "&:hover": {
//     backgroundColor: "rgb(247, 83, 58)",
//     boxShadow: "none",
//   },
// }));

export default function AddNewTask({
  open,
  setOpen,
  mode,
  status,
  setStatus,
  newTask,
  setNewTask,
}) {
  // const [inputList, setInputList] = useState([]);

  const [taskData, setTaskData] = useState({
    taskName: "",
    taskDesc: "",
    dateOfCreate: "",
    taskColumn: {
      taskColumnName: "",
      id: "",
    },
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
    let currentDate = new Date();
    updateForm({
      dateOfCreate: currentDate.toLocaleDateString(),
      taskColumn: {
        taskColumnName: e.target.value.taskColumnName,
        id: e.target.value.id,
      },
    });
  };

  function updateForm(value) {
    return setTaskData((prev) => {
      return { ...prev, ...value };
    });
  }

  const tasksGet = useSelector((state) => state.taskColumns);

  // const onAddBtnClick = () => {
  //   setInputList([...inputList, number]);
  //   number++;
  // };

  // const handleRemove = (e) => {
  //   const list = [...inputList];
  //   list.splice(e.target, 1);
  //   setInputList(list);
  // };

  // const list = inputList.map((element) => {
  //   return (
  //     <Stack
  //       key={element}
  //       direction="row"
  //       gap="10px"
  //       sx={{
  //         display: "flex",
  //         alignItems: "center",
  //       }}
  //     >
  //       <TextField
  //         sx={{ flex: "10" }}
  //         inputProps={{ style: { fontSize: 12 } }}
  //         InputLabelProps={{ style: { fontSize: 12 } }}
  //         placeholder="Your input here"
  //       />
  //       <DeleteButton sx={{ flex: "1" }} onClick={(e) => handleRemove(e)}>
  //         <DeleteIcon sx={{ fontSize: "24px" }} />
  //       </DeleteButton>
  //     </Stack>
  //   );
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    kanbanService
      .saveTask(taskData)
      .then((res) => {
        toast.success(`New column created`, {
          position: "bottom-right",
        });
        setNewTask(!newTask);
      })
      .catch((e) => {
        toast.error(`Column with this name already exists`, {
          position: "bottom-right",
        });
      });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setStatus("");
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Stack
          direction="column"
          gap="12px"
          sx={style}
          bgcolor={mode === "light" ? "white" : "#252525"}
        >
          <Typography variant="h5" fontWeight={600} color="text.primary">
            Add New Task
          </Typography>

          <TextField
            defaultValue=""
            sx={{ width: "100%" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            id="title"
            label="Title"
            placeholder="e.g. Make dinner"
            onChange={(e) => updateForm({ taskName: e.target.value })}
          ></TextField>
          <TextField
            sx={{ width: "100%" }}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            multiline={true}
            rows={8}
            id="desc"
            label="Description"
            placeholder="e.g. Dinner is made of..."
            onChange={(e) => updateForm({ taskDesc: e.target.value })}
          ></TextField>
          <Stack direction="column" gap="10px" sx={style2}>
            {/* <Typography color="text.primary">Subtasks</Typography> */}
            {/* <CreateButton variant="contained" onClick={onAddBtnClick}>
              Add New Subtask
            </CreateButton> */}
            {/* {list} */}
          </Stack>
          <Stack direction="column">
            <Typography color="text.primary">Status</Typography>

            <FormControl>
              <Select
                sx={{ fontSize: "16px" }}
                value={status}
                onChange={(e) => handleChange(e)}
                // displayEmpty
                // inputProps={{ "aria-label": "Without label" }}
              >
                {tasksGet.tasks.map((item) => {
                  return (
                    <MenuItem
                      key={item.id}
                      name={"item"}
                      value={item}
                      sx={{ fontSize: "16px" }}
                    >
                      {item.taskColumnName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
          <CreateButton variant="contained" type="submit">
            Add New Task
          </CreateButton>
        </Stack>
      </form>
    </Modal>
  );
}
