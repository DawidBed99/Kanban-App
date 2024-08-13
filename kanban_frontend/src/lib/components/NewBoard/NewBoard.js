import React from "react";

import { Button, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import Toc from "@mui/icons-material/Toc";

const LeftBarButton = styled(Button)(({ theme }) => ({
  color: "#4560A1",
  backgroundColor: "",
  "&:hover": {
    backgroundColor: "#55BCC9",
    color: "white",
  },
}));

const NewBoard = ({ setOpen }) => {
  const handleClick = () => {
    setOpen(true);
  };

  return (
    <LeftBarButton
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        fontSize: "20px",
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
        borderBottomLeftRadius: "0px",
        borderTopLeftRadius: "0px",
      }}
      onClick={() => handleClick()}
    >
      <Toc sx={{ fontSize: "24px" }} />
      <Typography sx={{ fontSize: "16px" }}> +Create New Board</Typography>
    </LeftBarButton>
  );
};

export default NewBoard;
