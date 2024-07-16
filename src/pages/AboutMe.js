import React from "react";
import { Grid, Typography, Button, Container, Paper, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";

const AboutMe = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} justifyContent="center" sx={{ py: 5 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4, height: "100%", background: "#F6E9E9" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "grey" }}>
              About Me
            </Typography>
            <Divider sx={{ borderWidth: "2px", mb: 3 }} />
            <Typography variant="body1" paragraph sx={{ color: "grey", textAlign: "justify" }}>
              Hi there! I'm Naveed, a passionate full-stack web developer currently pursuing my master's in Canada. My journey in the world of software engineering is marked by a deep love for
              building complex web applications and deploying them to the digital realm.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "grey", textAlign: "justify" }}>
              My expertise lies in crafting robust and dynamic platforms that seamlessly integrate the power of Django for backend development and React for frontend presentation. I believe in the
              importance of creating not just functional but also aesthetically pleasing web experiences.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "grey", textAlign: "justify" }}>
              In my projects, I focus on implementing cutting-edge technologies, such as JWT-based authentication and powerful CRUD operations. The combination of Django's reliability on the backend
              and React's responsiveness on the frontend ensures that the applications I build are both secure and user-friendly.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "grey", textAlign: "justify" }}>
              My ultimate goal is to become the best web developer there is, continuously learning and evolving in this ever-changing field. Feel free to explore my projects and get in touch if you
              have any questions or collaboration ideas. I'm always excited to connect with fellow developers and enthusiasts!
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button variant="contained" component={Link} to="/contact" endIcon={<PersonIcon />}>
                Contact Me
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, height: "100%", background: "#F6E9E9" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "grey" }}>
              Quick Info
            </Typography>
            <Divider sx={{ borderWidth: "2px", mb: 3 }} />
            <Box sx={{ mt: 4 }}>
              <InfoItem icon={<PersonIcon />} title="Name" text="Naveed" />
              <InfoItem icon={<SchoolIcon />} title="Education" text="Master's in Canada" />
              <InfoItem icon={<CodeIcon />} title="Expertise" text="Full-stack Web Development" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const InfoItem = ({ icon, title, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <Box sx={{ mr: 2, color: "primary.main" }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "grey" }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "grey" }}>
        {text}
      </Typography>
    </Box>
  </Box>
);

export default AboutMe;
