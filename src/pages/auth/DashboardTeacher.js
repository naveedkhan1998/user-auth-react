import React from "react";
import { Grid } from "@mui/material";
import MessagesList from "./MessagesList";
import UserInfo from "./UserInfo";
import StandardsList from "../managment/StandardsList";

const DashboardTeacher = () => {
  return (
    <>
      <Grid
        boxShadow={3}
        borderRadius={3}
        padding={3}
        sx={{
          background: "#F6E9E9",
          marginBottom: "20px",
        }}
      >
        <Grid container>
          <UserInfo />
          <StandardsList />
          <MessagesList />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardTeacher;
