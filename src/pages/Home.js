import React from "react";
import { Grid, Typography, Button, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container sx={{ py: 6 }}>
      <Paper
        elevation={1}
        sx={{
          px: 2,
          borderRadius: 3,
          background: "linear-gradient(to bottom, skyblue, lavender, pink)",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 4, mt: 4, color: "grey" }}
            >
              A Django-React app with JWT-based authentication and powerful CRUD
              operations.
            </Typography>
            <Typography variant="p" sx={{ mb: 4, color: "grey" }}>
              This website is a robust and dynamic platform that seamlessly
              combines the power of Django for backend development and React for
              frontend presentation. The Django backend ensures a solid
              foundation with its reliability and versatility, while React, on
              the frontend, delivers a highly responsive and interactive user
              interface. One of its standout features is the fully functional
              user authentication system, which provides secure access and
              personalized experiences for users. This authentication system
              safeguards sensitive information and grants access only to
              authorized individuals. Furthermore, the website incorporates
              basic CRUD (Create, Read, Update, Delete) functionalities,
              enabling users to manipulate data effortlessly. Django Rest
              Framework is employed to efficiently serve data through APIs on
              the backend, ensuring smooth data retrieval and interaction. To
              manage global application state effectively, React Redux Toolkit
              has been integrated, facilitating centralized state management and
              seamless data flow throughout the application. This combination of
              cutting-edge technologies results in a user-friendly,
              feature-rich, and high-performing web platform, ready to meet the
              demands of modern users.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            padding={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              variant="outlined" // Use "outlined" variant for a transparent button
              component={Link}
              to="/contact"
              sx={{ mt: 2 }}
            >
              Contact Us
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Home;
