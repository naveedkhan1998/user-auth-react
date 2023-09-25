import React from "react";
import { Container, Box, Grid, Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { getCurrentUserDetails } from "../../features/userSlice";

const DashboardParent = () => {
  const userData = useSelector(getCurrentUserDetails);

  return (
    <>
      <Container
        sx={{
          borderRadius: 3,
          background: "linear-gradient(to bottom, skyblue, lavender, pink)",
          py: 6,
          height:"100vh"
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", mb: 2, color: "grey" }}
              >
                Parent Dashboard
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="User Profile"
                  src={userData.avatar}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1, color: "grey" }}
                >
                  {userData.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "grey" }}>
                  {userData.email}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: "linear-gradient(to bottom, skyblue, lavender, pink)",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "grey" }}
              >
                Students
              </Typography>
              {/* {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={2}>
                {storeStandards?.map((item) => (
                  <Grid item key={item.id} xs={12} sm={6} md={4}>
                    <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 1, p: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Standard: {item.standard}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button variant="contained" sx={{ borderRadius: 20, px: 4 }}>
                          View
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )} */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardParent;
