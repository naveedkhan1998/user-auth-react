import React, { useState } from "react";
import { Grid, TextField, Button, Box, Alert, Typography, CircularProgress, Paper } from "@mui/material";
import { useSendPasswordResetEmailMutation } from "../../services/UserAuthApi";

const SendPasswordResetEmail = () => {
  const [serverError, setServerError] = useState({});
  const [serverMsg, setServerMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sendPasswordResetEmail] = useSendPasswordResetEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget);
    const actualData = { email: data.get("email") };

    try {
      const res = await sendPasswordResetEmail(actualData);
      if (res.data) {
        setServerError({});
        setServerMsg(res.data.msg);
        e.target.reset();
      } else if (res.error) {
        setServerMsg("");
        setServerError(res.error.data);
      }
    } catch (error) {
      setServerError({ non_field_errors: ["An unexpected error occurred."] });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ py: 6 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Please provide your email address.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={!!serverError.email}
              helperText={serverError.email?.[0]}
            />
            <Box sx={{ mt: 3, mb: 2 }}>
              <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Email"}
              </Button>
            </Box>
            {serverError.non_field_errors && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {serverError.non_field_errors[0]}
              </Alert>
            )}
            {serverMsg && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {serverMsg}
              </Alert>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SendPasswordResetEmail;
