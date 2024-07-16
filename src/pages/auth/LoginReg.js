import { useState } from "react";
import { Grid, Card, Tabs, Tab, Box, Typography, Container } from "@mui/material";
import { Person, PersonAdd } from "@mui/icons-material";
import UserLogin from "./UserLogin";
import UserRegistration from "./UserRegistration";
import { useSpring, animated } from "react-spring";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const TabPanel = ({ children, value, index }) => {
  return (
    <Box hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

const LoginReg = () => {
  const [value, setValue] = useState(0);
  const fade = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="md">
      <animated.div style={fade}>
        <Grid container justifyContent="center" sx={{ py: 8 }}>
          <Grid item xs={12}>
            <Card sx={{
              borderRadius: 4,
              background: '#ffffff',
              boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
              '&:hover': {
                boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
              },
              transition: 'box-shadow 0.3s ease-in-out',
            }}>
              <Box sx={{ padding: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    mb: 4,
                    color: '#1e1e1e',
                    textAlign: 'center',
                  }}
                >
                  Welcome
                </Typography>

                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  variant="fullWidth"
                  sx={{
                    '& .MuiTab-root': {
                      minHeight: 64,
                      fontSize: '1rem',
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

                {/* <Box sx={{ mt: 4 }}>
                  <GoogleLoginButton />
                </Box> */}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </animated.div>
    </Container>
  );
};

export default LoginReg;