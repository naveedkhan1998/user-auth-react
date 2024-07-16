import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Box, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleLoginButton = () => {
  const handleLoginSuccess = (response) => {
    // Handle successful login, e.g., send the token to your backend for verification
    console.log("Google Login Successful", response);
  };

  const handleLoginFailure = (error) => {
    // Handle login failure
    console.error("Google Login Failed", error);
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <GoogleLogin
        clientId="784896158603-23kjm5iiii1vhl2n9rpd417cq42b2hnk.apps.googleusercontent.com"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        render={({ onClick, disabled }) => (
          <Box
            onClick={onClick}
            disabled={disabled}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              color: "#757575",
              border: "1px solid #dadce0",
              borderRadius: "4px",
              padding: "10px 15px",
              cursor: "pointer",
              transition: "background-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                boxShadow: "0 1px 3px 1px rgba(66,64,67,0.15), 0 1px 2px 0 rgba(60,64,67,0.3)",
              },
            }}
          >
            <GoogleIcon sx={{ color: "#4285f4", mr: 1 }} />
            <Typography variant="button" sx={{ fontWeight: 500, textTransform: "none" }}>
              Continue with Google
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
};

export default GoogleLoginButton;
