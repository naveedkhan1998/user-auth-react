import React, { useState, useEffect } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserDetails } from "../../features/userSlice";
import { setStudents } from "../../features/studentSlice";
import { getCurrentStudentsList } from "../../features/studentSlice";
import { getToken } from "../../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import { useGetStudentQuery } from "../../services/ManagmentStudentsApi";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const StudentsInStandardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getCurrentUserDetails);
  console.log(userData);

  // comment this section for time being as redirect has been disabled for now
  /*     useEffect(()=>{
        if (!userData.is_teacher){
            navigate('/dashboard')
        }
    },[userData])  
 */
  const { id } = useParams();
  //const access_token = useSelector(getCurrentToken)
  const access_token = getToken();
  const { data, isSuccess, isLoading, isError } = useGetStudentQuery(
    id,
    access_token
  );

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setStudents({ id: id, data: data.data }));
    }
  }, [isSuccess, data, isError]);

  const all_students = useSelector(getCurrentStudentsList);
  const students = all_students.find((obj) => obj.id === id);
  console.log(students);

  return (
    <Container sx={{ py: 6 }}>
      <Grid
        boxShadow={3}
        borderRadius={3}
        container
        sx={{
          
          borderRadius: 3,
          background: "linear-gradient(to bottom, skyblue, lavender, pink)",
          minHeight: "100vh",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          students?.data.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} p={4}>
              <Box
                boxShadow={3}
                borderRadius={3}
                sx={{
                  padding: 3,
                  borderRadius: 3,
                  background:
                    "linear-gradient(to bottom, skyblue, lavender,pink)",
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
                  Name:{item.name}
                </Typography>
                <Typography
                  sx={{
                    color: "grey",
                    textTransform: "none",
                    fontWeight: "bold",
                    mr: 2,
                  }}
                >
                  Standard:{item.standard.standard}
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
