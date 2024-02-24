import React from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

function AboutMe() {
  return (
    <Container sx={{ py: 6, minHeight: "" }}>
      <Paper
        elevation={12}
        sx={{
          px: 6,
          borderRadius: 6,
          background: "#F6E9E9",
        }}
      >
        <Grid item xs={10} sm={8} md={7} lg={7} padding={3}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 4,
              mt: 4,
              color: "grey",
              textAlign: "left",
            }}
          >
            About Me
          </Typography>
          <Divider sx={{ borderWidth: "2px" }} />
          <Typography
            sx={{ mb: 4, mt: 4, color: "grey", textAlign: "justify" }}
          >
            Hi there! I'm Naveed, a passionate full-stack web developer
            currently pursuing my master's in Canada. My journey in the world of
            software engineering is marked by a deep love for building complex
            web applications and deploying them to the digital realm. My
            expertise lies in crafting robust and dynamic platforms that
            seamlessly integrate the power of Django for backend development and
            React for frontend presentation. I believe in the importance of
            creating not just functional but also aesthetically pleasing web
            experiences. In my projects, I focus on implementing cutting-edge
            technologies, such as JWT-based authentication and powerful CRUD
            operations. The combination of Django's reliability on the backend
            and React's responsiveness on the frontend ensures that the
            applications I build are both secure and user-friendly. My ultimate
            goal is to become the best web developer there is, continuously
            learning and evolving in this ever-changing field. Feel free to
            explore my projects and get in touch if you have any questions or
            collaboration ideas. I'm always excited to connect with fellow
            developers and enthusiasts!
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sm={8}
          md={6}
          lg={6}
          padding={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            component={Link}
            to="/contact"
            sx={{ mt: 3 }}
          >
            Contact Me
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AboutMe;
