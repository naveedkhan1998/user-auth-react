import React, { useState } from "react";
import { TextField, FormControlLabel, Checkbox, Button, Box, Alert, Typography, CircularProgress, Stepper, Step, StepLabel, InputAdornment, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../../services/LocalStorageService";
import { useRegisterUserMutation, useSendOTPMutation } from "../../services/UserAuthApi";
import { setCredentials } from "../../features/authSlice";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { Visibility, VisibilityOff, Email, Person, VpnKey, ConfirmationNumber } from "@mui/icons-material";

const UserRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerUser, { isLoading: LoadingRegisterUser }] = useRegisterUserMutation();
  const [sendOTP, { isLoading: LoadingSendOTP }] = useSendOTPMutation();

  const handleOTP = async (e) => {
    e.preventDefault();
    if (!isCaptchaSolved) {
      toast.error("Please solve the CAPTCHA");
      return;
    }
    const data = new FormData(e.currentTarget);
    const emailData = { email: data.get("email_otp") };
    try {
      const send = await sendOTP(emailData);
      if (send.error) {
        setServerError(send.error.data);
      } else {
        toast.success("OTP sent successfully");
        setActiveStep(1);
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      otp: data.get("otp"),
      password: data.get("password"),
      password2: data.get("password2"),
      tc: data.get("tc"),
    };

    try {
      const res = await registerUser(actualData);
      if (res.error) {
        setServerError(res.error.data);
      } else {
        storeToken(res.data.token);
        dispatch(setCredentials({ ...res.data.token }));
        toast.success("Registration successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
    }
  };

  const handleCaptchaChange = (value) => {
    setIsCaptchaSolved(!!value);
  };

  const steps = ["Enter Email", "Complete Registration"];

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 ? (
        <Box component="form" noValidate onSubmit={handleOTP} sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            required
            fullWidth
            id="email_otp"
            name="email_otp"
            label="Email Address"
            autoComplete="email"
            error={!!serverError.email}
            helperText={serverError.email?.[0]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />
          <ReCAPTCHA sitekey="6LcAAtooAAAAACEKM0Tr8tEldIIONanUrvB0bhHQ" onChange={handleCaptchaChange} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={LoadingSendOTP || !isCaptchaSolved}
            sx={{
              mt: 2,
              height: "40px",
              borderRadius: "20px",
            }}
          >
            {LoadingSendOTP ? <CircularProgress size={24} /> : "Generate OTP"}
          </Button>
        </Box>
      ) : (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            error={!!serverError.email}
            helperText={serverError.email?.[0]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="Full Name"
            autoComplete="name"
            error={!!serverError.name}
            helperText={serverError.name?.[0]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            fullWidth
            id="otp"
            name="otp"
            label="OTP"
            error={!!serverError.otp}
            helperText={serverError.otp?.[0]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ConfirmationNumber color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            error={!!serverError.password}
            helperText={serverError.password?.[0]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKey color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            fullWidth
            id="password2"
            name="password2"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            error={!!serverError.password2}
            helperText={serverError.password2?.[0]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKey color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel control={<Checkbox value={true} color="primary" name="tc" id="tc" />} label="I agree to the Terms and Conditions" />
          {serverError.tc && (
            <Typography color="error" variant="caption" display="block">
              {serverError.tc[0]}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={LoadingRegisterUser}
            sx={{
              mt: 2,
              height: "40px",
              borderRadius: "20px",
            }}
          >
            {LoadingRegisterUser ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Box>
      )}
      {serverError.non_field_errors && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {serverError.non_field_errors[0]}
        </Alert>
      )}
    </Box>
  );
};

export default UserRegistration;
