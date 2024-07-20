import { useState } from "react";
import { Grid, Tabs, Tab, Box, Typography, Container, Paper, useMediaQuery, useTheme } from "@mui/material";
import { Person, PersonAdd } from "@mui/icons-material";
import UserLogin from "./UserLogin";
import UserRegistration from "./UserRegistration";
import { useSpring, animated } from "react-spring";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const TabPanel = ({ children, value, index }) => {
  return <Box hidden={value !== index}>{value === index && <Box>{children}</Box>}</Box>;
};

const LoginReg = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fade = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 60 },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4, // Add padding top and bottom
      }}
    >
      <animated.div style={fade} className="full-width">
        <Paper
          elevation={10}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <Grid container>
            {!isMobile && (
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  padding: 4,
                }}
              >
                <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                  Welcome Back
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  To keep connected with us please login with your personal info
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} md={isMobile ? 12 : 6}>
              <Box sx={{ padding: { xs: 2, sm: 4 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    mb: 4,
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {value === 0 ? "Sign In" : "Create Account"}
                </Typography>

                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="primary"
                  indicatorColor="primary"
                  variant="fullWidth"
                  sx={{
                    "& .MuiTab-root": {
                      minHeight: 64,
                      fontSize: "1rem",
                    },
                    mb: 4,
                  }}
                >
                  <Tab
                    icon={<Person />}
                    label="Login"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  />
                  <Tab
                    icon={<PersonAdd />}
                    label="Sign Up"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  />
                </Tabs>

                <TabPanel value={value} index={0}>
                  <UserLogin />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <UserRegistration />
                </TabPanel>

                {/* <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Or continue with
                  </Typography>
                  <GoogleLoginButton />
                </Box> */}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </animated.div>
    </Container>
  );
};

export default LoginReg;
