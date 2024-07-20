import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/UserAuthApi";
import { Alert, Box, Button, Container, Paper, TextField, Typography, Snackbar, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Visibility, VisibilityOff, LockReset } from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: theme.palette.background.default,
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
  borderRadius: "15px",
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1.5),
  borderRadius: "25px",
  fontWeight: "bold",
}));

const ResetPassword = () => {
  const [serverError, setServerError] = useState({});
  const [serverMsg, setServerMsg] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const password2 = formData.get("password2");

    if (password !== password2) {
      setServerError({ password2: ["Passwords do not match"] });
      setIsLoading(false);
      return;
    }

    const actualData = { password, password2 };

    try {
      const res = await resetPassword({ actualData, id, token });
      if (res.data) {
        setServerError({});
        setServerMsg(res.data.msg);
        setIsSnackbarOpen(true);
        e.target.reset();
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      console.log(error);
      const errorMsg = error.data?.msg || "An error occurred while resetting the password.";
      setServerMsg(errorMsg);
      setServerError(error.data || {});
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <LockReset color="primary" sx={{ fontSize: 40, mb: 2 }} />
        <Typography component="h1" variant="h5" gutterBottom>
          Reset Your Password
        </Typography>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            error={!!serverError.password}
            helperText={serverError.password && serverError.password[0]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm New Password"
            type={showPassword ? "text" : "password"}
            id="password2"
            autoComplete="new-password"
            error={!!serverError.password2}
            helperText={serverError.password2 && serverError.password2[0]}
          />
          <StyledButton type="submit" fullWidth variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Reset Password"}
          </StyledButton>
          {Object.keys(serverError).map((key) => (
            <Alert severity="error" sx={{ mt: 2 }} key={key}>
              {serverError[key][0]}
            </Alert>
          ))}
        </StyledForm>
      </StyledPaper>
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={() => setIsSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setIsSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {serverMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ResetPassword;
