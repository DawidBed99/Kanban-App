import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";

const AddNewColumnTask = ({ mode, setOpenAddColumn }) => {
  return (
    <Button
      sx={{
        textTransform: "none",
        borderRadius: "0px",
        bgcolor: "#dcf5fa",
        width: "300px",
        "&:hover": {
          boxShadow: "none",
          bgcolor: "#baeffa",
        },
      }}
      onClick={() => setOpenAddColumn(true)}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <AddIcon sx={{ color: mode === "light" ? "#252525" : "white" }} />
          <Typography
            variant="h5"
            sx={{ color: mode === "light" ? "#252525" : "white" }}
          >
            New column
          </Typography>
        </Stack>
      </Box>
    </Button>
  );
};

export default AddNewColumnTask;
