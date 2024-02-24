import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        backgroundColor: "#2f3133",
        color: "#F6E9E9",
        padding: "1rem",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Mohammad Naveed Khan{" "}
        <a href="https://www.linkedin.com/in/mohammad-naveed-khan-956b10198/">
          (Link)
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
