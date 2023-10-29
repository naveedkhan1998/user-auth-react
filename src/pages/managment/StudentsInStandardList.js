import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUserDetails } from "../../features/userSlice";
import {
  setStudents,
  getCurrentStudentsList,
} from "../../features/studentSlice";
import { getToken } from "../../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import { useGetStudentQuery } from "../../services/ManagmentStudentsApi";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const StudentsInStandardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getCurrentUserDetails);

  const { id } = useParams();
  const access_token = getToken();
  const { data, isSuccess, isLoading, isError } = useGetStudentQuery(
    id,
    access_token
  );

 /*  useEffect(() => {
    if (!userData.is_teacher) {
      navigate("/dashboard");
    }
  }, [userData, navigate]);
 */
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setStudents({ id: id, data: data.data }));
    }
  }, [isSuccess, data, dispatch]);

  const all_students = useSelector(getCurrentStudentsList);
  const students = all_students.find((obj) => obj.id === id);

  return (
    <Container sx={{ py: 6 }}>
      <Grid
        container
        sx={{
          boxShadow: 3,
          borderRadius: 3,
          background: "#F6E9E9",
          minHeight: "100vh",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          students?.data.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} p={4}>
              <Box
                sx={{
                  boxShadow: 3,
                  borderRadius: 3,
                  background: "#F6E9E9",
                  padding: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "grey",
                    textTransform: "none",
                    fontWeight: "bold",
                    mr: 2,
                  }}
                >
                  Name: {item.name}
                </Typography>
                <Typography
                  sx={{
                    color: "grey",
                    textTransform: "none",
                    fontWeight: "bold",
                    mr: 2,
                  }}
                >
                  Standard: {item.standard.standard}
                </Typography>
                <Typography
                  sx={{
                    color: "grey",
                    textTransform: "none",
                    fontWeight: "bold",
                    mr: 2,
                  }}
                >
                  In Session: {item.is_in_session ? "🟢" : "🔴"}
                </Typography>
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    variant="outlined"
                    borderRadius={3}
                    //onClick={() => navigate(`/students/${item.id}`)}
                  >
                    Details
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default StudentsInStandardList;
