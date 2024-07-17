import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUserDetails } from "../../features/userSlice";
import { setStudents, getCurrentStudentsList } from "../../features/studentSlice";
import { getToken } from "../../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import { useGetStudentQuery } from "../../services/ManagmentStudentsApi";

import { Box, Button, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";

const StudentsInStandardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getCurrentUserDetails);

  const { id } = useParams();
  const access_token = getToken();
  const { data, isSuccess, isLoading, isError } = useGetStudentQuery(id, access_token);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setStudents({ id: id, data: data.data }));
    }
  }, [isSuccess, data, dispatch]);

  const all_students = useSelector(getCurrentStudentsList);
  const students = all_students.find((obj) => obj.id === id);

  return (
    <Container sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, minHeight: "80vh", background: "#fff" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4, color: "#333" }}>
          Students in Standard {id}
        </Typography>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {students?.data.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#555" }}>
                    Name: {item.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: "#777" }}>
                    Standard: {item.standard.standard}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: item.is_in_session ? "green" : "red" }}>
                    In Session: {item.is_in_session ? "🟢" : "🔴"}
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2, color: "#2196F3", borderColor: "#2196F3", "&:hover": { backgroundColor: "#e3f2fd" } }}
                    //onClick={() => navigate(`/students/${item.id}`)}
                  >
                    Details
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default StudentsInStandardList;
