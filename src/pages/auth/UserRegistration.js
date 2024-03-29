import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../../services/LocalStorageService";
import {
  useRegisterUserMutation,
  useSendOTPMutation,
} from "../../services/UserAuthApi";
import { setCredentials, logOut } from "../../features/authSlice";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

const UserRegistration = () => {
  const dispatch = useDispatch();
  const [server_error, setServerError] = useState({});
  const [otp_generated, setOtpGenerated] = useState(false);
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);

  const navigate = useNavigate();

  const [registerUser, { isLoading: LoadingRegisterUser }] =
    useRegisterUserMutation();
  const [sendOTP, { isLoading: LoadingSendOTP }] = useSendOTPMutation();

  const handleOTP = async (e) => {
    if (!isCaptchaSolved) {
      e.preventDefault();
      toast("Please solve the CAPTCHA");
      return;
    }
    e.preventDefault();
    const data2 = new FormData(e.currentTarget);
    const emailData = {
      email: data2.get("email_otp"),
    };
    const send = await sendOTP(emailData);
    if (send.error) {
      //console.log(typeof(res.error.data))
      //console.log(res.error.data)
      setServerError(send.error.data);
    }
    if (send.data) {
      console.log(send.data);
      toast("OTP sent");
      setOtpGenerated(true);
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

    const res = await registerUser(actualData);
    if (res.error) {
      //console.log(typeof(res.error.data))
      //console.log(res.error.data)
      setServerError(res.error.data);
    }
    if (res.data) {
      console.log(res.data);
      storeToken(res.data.token);
      dispatch(setCredentials({ ...res.data.token }));
      toast("Logged In!!");
      navigate("/dashboard");
    }
  };
  const handleCaptchaChange = (value) => {
    if (value) {
      setIsCaptchaSolved(true);
    } else {
      setIsCaptchaSolved(false);
    }
  };

  return (
    <>
      {/*   {server_error.name? console.log(server_error.name[0]):''}
  {server_error.email? console.log(server_error.email[0]):''}
  {server_error.password? console.log(server_error.password[0]):''}
  {server_error.password2? console.log(server_error.password2[0]):''}
  {server_error.non_field_errors? console.log(server_error.non_field_errors[0]):''}
  {server_error.tc? console.log(server_error.tc[0]):''} */}
      <Box>
        {!otp_generated ? (
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            id="send-otp-form"
            onSubmit={handleOTP}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email_otp"
              name="email_otp"
              label="Email Address"
            />
            <ReCAPTCHA
              sitekey="6LcAAtooAAAAACEKM0Tr8tEldIIONanUrvB0bhHQ"
              onChange={handleCaptchaChange}
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
              {LoadingSendOTP ? (
                <CircularProgress size={30} />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, px: 5 }}
                >
                  Generate OTP
                </Button>
              )}
            </Box>
            {server_error.non_field_errors ? (
              <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
            ) : (
              ""
            )}
          </Box>
        ) : (
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            id="registration-form"
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

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              label="Full Name"
            />
            {server_error.name ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: "10" }}
              >
                {server_error.name[0]}
              </Typography>
            ) : (
              ""
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              name="otp"
              label="OTP"
              type="otp"
            />
            {server_error.password ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: "10" }}
              >
                {server_error.password[0]}
              </Typography>
            ) : (
              ""
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
            />
            {server_error.password ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: "10" }}
              >
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
              label="Confirm Password"
              type="password"
            />
            {server_error.password2 ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: "10" }}
              >
                {server_error.password2[0]}
              </Typography>
            ) : (
              ""
            )}

            <FormControlLabel
              control={
                <Checkbox value={true} color="primary" name="tc" id="tc" />
              }
              label="I agree to all this."
            />
            {server_error.tc ? (
              <span style={{ fontSize: 12, color: "red", paddingLeft: "10" }}>
                {server_error.tc[0]}
              </span>
            ) : (
              ""
            )}
            <Box textAlign="center">
              {LoadingRegisterUser ? (
                <CircularProgress size={30} />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, px: 5 }}
                >
                  Register
                </Button>
              )}
            </Box>
            {server_error.non_field_errors ? (
              <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
            ) : (
              ""
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default UserRegistration;
