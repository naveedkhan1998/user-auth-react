import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#363333",
        color: "#F6E9E9",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Mohammad Naveed Khan
      </Typography>
      <Typography variant="body2">
        <Link href="#" color="inherit">
          Privacy Policy
        </Link>
      </Typography>
      <Typography variant="body2">
        <Link
          href="#"
          color="inherit"
        >
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
