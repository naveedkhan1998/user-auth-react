import React from "react";
import { Grid, Typography, Button, Container, Paper, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import DjangoIcon from "@mui/icons-material/Code";
import ReactIcon from "@mui/icons-material/Web";
import SecurityIcon from "@mui/icons-material/Security";
import StorageIcon from "@mui/icons-material/Storage";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} justifyContent="center" sx={{ py: 5 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4, height: "100%", background: "#fff", borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
              A Django-React app with JWT-based authentication and powerful CRUD operations
            </Typography>
            <Divider sx={{ borderWidth: "2px", mb: 3 }} />
            <Typography variant="body1" paragraph sx={{ color: "#555", textAlign: "justify" }}>
              This website is a robust and dynamic platform that seamlessly combines the power of Django for backend development and React for frontend presentation. The Django backend ensures a solid
              foundation with its reliability and versatility, while React, on the frontend, delivers a highly responsive and interactive user interface.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#555", textAlign: "justify" }}>
              One of its standout features is the fully functional user authentication system, which provides secure access and personalized experiences for users. This authentication system
              safeguards sensitive information and grants access only to authorized individuals.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#555", textAlign: "justify" }}>
              Furthermore, the website incorporates basic CRUD (Create, Read, Update, Delete) functionalities, enabling users to manipulate data effortlessly. Django Rest Framework is employed to
              efficiently serve data through APIs on the backend, ensuring smooth data retrieval and interaction.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#555", textAlign: "justify" }}>
              To manage global application state effectively, React Redux Toolkit has been integrated, facilitating centralized state management and seamless data flow throughout the application. This
              combination of cutting-edge technologies results in a user-friendly, feature-rich, and high-performing web platform, ready to meet the demands of modern users.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button variant="contained" component={Link} to="/contact" endIcon={<SecurityIcon />} sx={{ backgroundColor: "#2196F3", "&:hover": { backgroundColor: "#1976D2" } }}>
                Contact Us
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, height: "100%", background: "#fff", borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
              Key Features
            </Typography>
            <Divider sx={{ borderWidth: "2px", mb: 3 }} />
            <Box sx={{ mt: 4 }}>
              <FeatureItem icon={<DjangoIcon />} title="Django Backend" text="Reliable and versatile foundation" />
              <FeatureItem icon={<ReactIcon />} title="React Frontend" text="Responsive and interactive UI" />
              <FeatureItem icon={<SecurityIcon />} title="JWT Authentication" text="Secure user access" />
              <FeatureItem icon={<StorageIcon />} title="CRUD Operations" text="Effortless data manipulation" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const FeatureItem = ({ icon, title, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <Box sx={{ mr: 2, color: "primary.main" }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#333" }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#555" }}>
        {text}
      </Typography>
    </Box>
  </Box>
);

export default Home;
