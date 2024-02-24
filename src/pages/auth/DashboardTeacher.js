import React from "react";
import { Grid } from "@mui/material";
import MessagesList from "./MessagesList";
import UserInfo from "./UserInfo";
import StandardsList from "../managment/StandardsList";

const DashboardTeacher = () => {
  return (
    <Grid
      container
      boxShadow={12}
      borderRadius={6}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        background: "#F6E9E9",
        marginBottom: "20px",
      }}
    >
      <UserInfo />
      <StandardsList />
      <MessagesList />
    </Grid>
  );
};

export default DashboardTeacher;
