import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Alert, Typography, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/authSlice";
import { getToken, storeToken } from "../../services/LocalStorageService";
import { useLoginUserMutation } from "../../services/UserAuthApi";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UserLogin = () => {
  const [serverError, setServerError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const res = await loginUser(actualData);
      if (res.error) {
        setServerError(res.error.data);
      }
      if (res.data) {
        storeToken(res.data.token);
        toast.success("Logged In Successfully");
        dispatch(setCredentials({ ...res.data.token }));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    }
  };

  useEffect(() => {
    const { access_token, refresh_token } = getToken();
    if (access_token && refresh_token) {
      dispatch(setCredentials({ access: access_token, refresh: refresh_token }));
    }
  }, [dispatch]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField required fullWidth id="email" name="email" label="Email Address" autoComplete="email" error={!!serverError.email} helperText={serverError.email?.[0]} />
      <TextField
        required
        fullWidth
        id="password"
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        error={!!serverError.password}
        helperText={serverError.password?.[0]}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <NavLink to="/sendpasswordresetemail" style={{ textDecoration: "none", color: "primary.main" }}>
          Forgot Password?
        </NavLink>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            minWidth: "120px",
            height: "40px",
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </Box>
      {serverError.errors && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {serverError.errors.non_field_errors?.[0]}
        </Alert>
      )}
    </Box>
  );
};

export default UserLogin;
