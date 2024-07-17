import React, { useState } from "react";
import { Grid, TextField, Button, CircularProgress, Typography, Paper, Box, Container, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAddMessageMutation } from "../services/messagesApi";
import ReCAPTCHA from "react-google-recaptcha";
import SendIcon from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Contact = () => {
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCaptchaSolved) {
      setSnackbar({ open: true, message: "Please solve the CAPTCHA", severity: "warning" });
      return;
    }

    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    };

    try {
      const res = await addMessage(actualData);
      if (res.data) {
        setSnackbar({ open: true, message: res.data.msg, severity: "success" });
        e.target.reset();
        setIsCaptchaSolved(false);
      }
    } catch (error) {
      setSnackbar({ open: true, message: "An error occurred. Please try again.", severity: "error" });
    }
  };

  const handleCaptchaChange = (value) => {
    setIsCaptchaSolved(!!value);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} justifyContent="center" sx={{ py: 5 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: "100%", background: "#fff", borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#555" }}>
              Have a question or comment? Send us a message, and we'll get back to you as soon as possible.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" />
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" type="email" />
              <TextField margin="normal" required fullWidth name="message" label="Message" id="message" multiline rows={4} />
              <Box sx={{ my: 2 }}>
                <ReCAPTCHA sitekey="6LcAAtooAAAAACEKM0Tr8tEldIIONanUrvB0bhHQ" onChange={handleCaptchaChange} />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                disabled={isLoading || !isCaptchaSolved}
                sx={{ backgroundColor: "#2196F3", "&:hover": { backgroundColor: "#1976D2" } }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Send Message"}
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: "100%", background: "#fff", borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
              Get In Touch
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#555" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam nec felis gravida, a malesuada urna tincidunt.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <ContactInfoItem icon={<PhoneIcon />} text="+1 1234567890" />
              <ContactInfoItem icon={<EmailIcon />} text="info@example.com" />
              <ContactInfoItem icon={<LocationOnIcon />} text="House No.1, New York, USA" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const ContactInfoItem = ({ icon, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <Box sx={{ mr: 2, color: "primary.main" }}>{icon}</Box>
    <Typography variant="body1" sx={{ color: "#555" }}>
      {text}
    </Typography>
  </Box>
);

export default Contact;
