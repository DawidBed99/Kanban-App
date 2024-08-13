import React, { useEffect, useRef, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import Switch from "@mui/material/Switch";

import DarkModeIcon from "@mui/icons-material/DarkMode";

import LightModeIcon from "@mui/icons-material/LightMode";

import Boards from "../Boards/Boards";

import NewBoard from "../NewBoard/NewBoard";

import NewBoardModal from "../NewBoardModal/NewBoardModal";

import Rows from "@mui/icons-material/TableRows";

import useScreenSize from "../../../customHooks/useScreenSize";

import { useSelector } from "react-redux";

const LeftBar = ({
  setMode,
  mode,
  setBoardSelected,
  boardSelected,
  setBoardSelectedName,
  boardSelectedName,
  edited,
  setEdited,
}) => {
  const [open, setOpen] = useState(false);
  const [newPro, setNewPro] = useState(false);

  const [switchChecked, setSwitchChecked] = useState(
    localStorage.getItem("mode") === "light" ? true : false
  );

  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const screenSize = useScreenSize();

  useEffect(() => {
    setSwitchChecked(!switchChecked);
  }, [mode]);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  });

  const getBoards = useSelector((state) => state.boards);

  const style2 = {
    bgcolor: mode === "light" ? "white" : "#252525",
    padding: "36px 36px 5px 0px",
    borderRight: "#b6b5b5 1px solid",
    overflowY: "scroll",
    overflowX: "hidden",
    height: "auto",
    "&::-webkit-scrollbar": {
      width: height < screenSize.height - 200 ? "0px" : "8px",
    },

    "&::-webkit-scrollbar-thumb": {
      background: mode === "light" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.4)",
    },
    "&::-webkit-scrollbar-track": {
      background: mode === "light" ? "rgba(0,0,0,0.2)" : "white",
    },
  };

  return (
    <Box sx={style2} flex={1}>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          marginLeft: "5px",
        }}
      >
        <Rows sx={{ fontSize: "36px", color: "#55BCC9" }} />
        <Typography variant="h4" fontWeight="800">
          Kanban
        </Typography>
      </Stack>

      <Stack
        ref={ref}
        sx={{
          marginTop: "30px",
          display: "flex",
          alignItems: "left",
          gap: "12px",
        }}
      >
        <Typography
          sx={{ fontSize: "24px", alignSelf: "center", fontWeight: "600" }}
        >
          Boards ({getBoards.projects.length})
        </Typography>
        <Boards
          newPro={newPro}
          setNewPro={setNewPro}
          mode={mode}
          setBoardSelected={setBoardSelected}
          boardSelected={boardSelected}
          setBoardSelectedName={setBoardSelectedName}
          boardSelectedName={boardSelectedName}
          edited={edited}
          setEdited={setEdited}
        />
        <NewBoard setOpen={setOpen} />
      </Stack>
      <NewBoardModal
        open={open}
        setOpen={setOpen}
        mode={mode}
        setNewPro={setNewPro}
      />
      <Stack
        direction="row"
        sx={{
          bgcolor: "#55BCC9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          ml: "10px",
          padding: "2px",
          mt: "40px",
        }}
      >
        <LightModeIcon />
        <Switch
          checked={switchChecked}
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
        />
        <DarkModeIcon />
      </Stack>
    </Box>
  );
};

export default LeftBar;
