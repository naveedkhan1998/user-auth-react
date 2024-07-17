import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import MessagesList from "./MessagesList";
import UserInfo from "./UserInfo";
import StandardsList from "../managment/StandardsList";

const DashboardTeacher = () => {
  return (
    <Paper elevation={12} sx={{ borderRadius: 4, bgcolor: "#fff", p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
        Teacher Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 4, height: "100%" }}>
            <UserInfo />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 4, height: "100%" }}>
            <StandardsList />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
            <MessagesList />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DashboardTeacher;
