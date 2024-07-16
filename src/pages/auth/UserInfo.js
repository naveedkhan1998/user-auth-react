import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { getCurrentUserDetails } from "../../features/userSlice";

const UserInfo = () => {
  const userData = useSelector(getCurrentUserDetails);

  return (
    <Paper elevation={3} sx={{ borderRadius: 6, p: 3, height: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "grey" }}>
          Main Dashboard
        </Typography>
        <Avatar alt="User Profile" src={userData.avatar} sx={{ width: 100, height: 100, mb: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "grey" }}>
          Name: {userData.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "grey" }}>
          Email: {userData.email}
        </Typography>
      </Box>
    </Paper>
  );
};

export default UserInfo;
