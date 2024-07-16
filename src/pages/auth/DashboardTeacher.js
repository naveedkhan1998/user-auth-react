import React from "react";
import { Grid, Paper } from "@mui/material";
import MessagesList from "./MessagesList";
import UserInfo from "./UserInfo";
import StandardsList from "../managment/StandardsList";

const DashboardTeacher = () => {
  return (
    <Paper elevation={12} sx={{ borderRadius: 6, bgcolor: "#F6E9E9", mb: 3, p: 3 }}>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={6}>
          <UserInfo />
        </Grid>
        <Grid item xs={12} md={6}>
          <StandardsList />
        </Grid>
        <Grid item xs={12}>
          <MessagesList />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DashboardTeacher;
