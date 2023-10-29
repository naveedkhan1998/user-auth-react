import React from "react";
import { Button, Grid, Paper, Toolbar, Typography } from "@mui/material";

const Home = () => {
  const styles = {
    root: {
      flexGrow: 1,
      height: "100vh",
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      padding: "1rem",
      textAlign: "center",
      color: "#654321",
      backgroundColor: "#f5deb3",
      boxShadow: "none",
    },
    button: {
      margin: "0.5rem",
    },
  };

  return (
    <div style={styles.root}>
      <Grid justifyContent="center" sx={{ py: 6, mx: "auto" }}>
        <Grid item xs={12}>
          <Paper style={styles.paper}>
            <Typography variant="h4">
              Welcome to Master Mind Institute
            </Typography>
            <Typography variant="subtitle1">
              At Master Mind Institute, we believe that every student is unique
              and has their own learning style. Our experienced and highly
              qualified faculty members understand this and provide personalized
              attention to each student to help them reach their full potential.
              We offer a comprehensive range of courses that cover all major
              subjects, including Mathematics, Science, Social Studies, English,
              and more. Our courses are designed to cater to the individual
              needs of each student and help them excel in their academics. Our
              state-of-the-art facilities and technology-enabled classrooms
              provide a conducive learning environment for students. We use the
              latest teaching methods and tools to make learning engaging and
              interactive for our students. We take pride in our track record of
              producing outstanding results and helping students achieve their
              academic and personal goals. Our students have gone on to excel in
              their chosen fields and become successful individuals. Join us at
              Master Mind Institute and let us help you unlock your full
              potential and achieve your dreams.
            </Typography>
            <Button variant="contained" color="primary" style={styles.button}>
              Learn More
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={styles.paper}>
            <Typography variant="h5">Our Courses</Typography>
            <Typography variant="subtitle1">
              We offer a comprehensive range of courses that cover all major
              subjects, including Mathematics, Science, Social Studies, English,
              and more.
            </Typography>
            <Button variant="contained" color="primary" style={styles.button}>
              View Courses
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={styles.paper}>
            <Typography variant="h5">Our Faculty</Typography>
            <Typography variant="subtitle1">
              Our experienced and highly qualified faculty members provide
              personalized attention to each student to help them reach their
              full potential.
            </Typography>
            <Button variant="contained" color="primary" style={styles.button}>
              Meet Our Faculty
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={styles.paper}>
            <Typography variant="h5">Why Choose Us?</Typography>
            <Typography variant="subtitle1">
              Our state-of-the-art facilities and technology-enabled classrooms
              provide a conducive learning environment for students. We take
              pride in our track record of producing outstanding results and
              helping students achieve their academic and personal goals.
            </Typography>
            <Button variant="contained" color="primary" style={styles.button}>
              Learn More
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
