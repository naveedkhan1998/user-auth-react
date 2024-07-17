import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { getCurrentUserDetails } from "../../features/userSlice";

const UserInfo = () => {
  const userData = useSelector(getCurrentUserDetails);

  return (
    <Paper elevation={3} sx={{ borderRadius: 4, p: 4, height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#333" }}>
        Main Dashboard
      </Typography>
      <Avatar alt="User Profile" src={userData.avatar} sx={{ width: 100, height: 100, mb: 2 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#555" }}>
        {userData.name}
      </Typography>
      <Typography variant="body2" sx={{ color: "#777", mb: 1 }}>
        {userData.email}
      </Typography>
      <Typography variant="body2" sx={{ color: "#777" }}>
        {userData.is_teacher ? "Teacher" : "Parent"}
      </Typography>
    </Paper>
  );
};

export default UserInfo;
