import { Box, Typography } from "@mui/material";
import React from "react";

const NoBoard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" mt="200px">
        No Board Selected!
      </Typography>
    </Box>
  );
};

export default NoBoard;
