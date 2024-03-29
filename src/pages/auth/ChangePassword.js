import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useChangeUserPasswordMutation } from "../../services/UserAuthApi";
import { getToken } from "../../services/LocalStorageService";

const ChangePassword = () => {
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});
  const navigate = useNavigate();

  const [changeUserPassword] = useChangeUserPasswordMutation();
  const { access_token } = getToken();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get("password"),
      password2: data.get("password2"),
    };
    const res = await changeUserPassword({ actualData, access_token });
    if (res.error) {
      setServerMsg({});
      setServerError(res.error.data);
    }
    if (res.data) {
      //console.log(res.data)
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("password-change-form").reset();
    }
  };
  //const myData = useSelector(state=>state.user)
  //console.log("change pass",myData)
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWarp: "warp",
        maxWidth: "auto",
        mx: 4
      }}
    >
      
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="password-change-form"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="New Password"
          type="password"
          autoComplete="new-password"
        />
        {server_error.password ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: "10" }}>
            {server_error.password[0]}
          </Typography>
        ) : (
          ""
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="password2"
          name="password2"
          label="Confirm New Password"
          type="password"
          autoComplete="new-password"
        />
        {server_error.password2 ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: "10" }}>
            {server_error.password2[0]}
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
            Update Password
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
    </Box>
  );
};

export default ChangePassword;
