import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSendPasswordResetEmailMutation } from "../../services/UserAuthApi";

const SendPasswsordResetEmail = () => {
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});

  const [sendPasswordResetEmail, { isLoading }] =
    useSendPasswordResetEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
    };
    const res = await sendPasswordResetEmail(actualData);
    if (res.error) {
      setServerMsg({});
      setServerError(res.error.data);
      //console.log(res.error.data)
    }
    if (res.data) {
      //console.log(res.data)
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("password-reset-email-form").reset();
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        sx={{ py: 6, minHeight: "100vh" }}
      >
        <Grid
          item
          sm={6}
          xs={12}
          sx={{
            borderRadius: "12px",
            background: "linear-gradient(to bottom, skyblue, lavender, pink)",
            px: 3,
          }}
        >
          <Typography
            style={{
              fontSize: 24,
              color: "grey",
              paddingTop: "20px",
              py: 6,
              px: 6,
            }}
          >
            Please provide your email address.
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              mt: 2,
              borderRadius: "12px",
              px: 4,
            }}
            id="password-reset-email-form"
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
            />
            {server_error.email ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: "10" }}
              >
                {server_error.email[0]}
              </Typography>
            ) : (
              ""
            )}
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                Send Email
              </Button>
            </Box>
            {server_error.non_field_errors ? (
              <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
            ) : (
              ""
            )}
            {server_msg.msg ? (
              <Alert severity="success">{server_msg.msg}</Alert>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SendPasswsordResetEmail;
