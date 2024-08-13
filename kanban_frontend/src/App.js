import { useEffect, useState } from "react";
import LeftBar from "./lib/components/LeftBar/LeftBar";
import Dashboard from "./pages/Dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CloseIcon from "@mui/icons-material/Close";

import { Button, Stack } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("mode") !== null
      ? localStorage.getItem("mode")
      : "light"
  );
  const [boardSelected, setBoardSelected] = useState("");
  const [boardSelectedName, setBoardSelectedName] = useState("");
  const [edited, setEdited] = useState(false);

  const CloseButton = ({ closeToast }) => (
    <i onClick={closeToast}>
      <CloseIcon
        sx={{ fontSize: "16px", color: mode === "light" ? "black" : "white" }}
      />
    </i>
  );

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        closeButton={CloseButton}
        toastStyle={{
          backgroundColor: mode === "light" ? "" : "#252525",
          color: mode === "light" ? "" : "white",
        }}
      />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          // height: mode === "light" ? "100%" : "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <LeftBar
          setMode={setMode}
          mode={mode}
          setBoardSelected={setBoardSelected}
          boardSelected={boardSelected}
          setBoardSelectedName={setBoardSelectedName}
          boardSelectedName={boardSelectedName}
          edited={edited}
          setEdited={setEdited}
        />
        <Dashboard
          edited={edited}
          setEdited={setEdited}
          boardSelected={boardSelected}
          mode={mode}
          boardSelectedName={boardSelectedName}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
