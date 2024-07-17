import React from "react";
import { Box, Typography, Link } from "@mui/material";

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
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Mohammad Naveed Khan{" "}
        <Link
          href="https://www.linkedin.com/in/mohammad-naveed-khan-956b10198/"
          target="_blank"
          rel="noopener"
          sx={{
            color: "#F6E9E9",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
              color: "#ffffff",
            },
          }}
        >
          (LinkedIn)
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
