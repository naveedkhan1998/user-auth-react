import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserDetails } from "../../features/userSlice";
import { useGetStandardQuery } from "../../services/ManagmentStandardApi";
import { setstandards, getStandardsList } from "../../features/standardSlice";
import { getCurrentToken } from "../../features/authSlice";

const DashboardTeacher = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getCurrentUserDetails);
  const access_token = useSelector(getCurrentToken);
  const { data, isSuccess, isLoading, isError } =
    useGetStandardQuery(access_token);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess && data) {
      //console.log(data)
      dispatch(setstandards([...data?.data]));
    }
    if (isError) {
      // Handle error here
    }
  }, [isSuccess, data, isError]);

  const storeStandards = useSelector(getStandardsList);
  //console.log("in teach",storeStandards)

  return (
    <>
      <Grid
        boxShadow={3}
        borderRadius={3}
        sx={{
          borderRadius: 3,
          background: "linear-gradient(to bottom, skyblue, lavender, pink)",
          py: 6,
          px: 3,
        }}
      >
        <Grid container>
          <Grid item xs={12} md={12} boxShadow={3} borderRadius={3} m={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                margin={3}
                sx={{ fontWeight: "bold", mb: 2, color: "grey" }}
              >
                Main Dashboard
              </Typography>
              <Box
                margin={3}
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
                  Name: {userData.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "grey" }}>
                  Email: {userData.email}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} boxShadow={3} borderRadius={3} m={2}>
            <Box
              sx={{
                background:
                  "linear-gradient(to bottom, skyblue, lavender,pink)",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "grey" }}
              >
                Standards
              </Typography>
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "grey",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {storeStandards?.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                      <Box
                        boxShadow={3}
                        borderRadius={3}
                        sx={{
                          background:
                            "linear-gradient(to bottom, skyblue, lavender,pink)",
                          borderRadius: 3,
                          p: 3,
                          padding: 3,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mb: 1, color: "grey" }}
                        >
                          Standard: {item.standard}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", mb: 1, color: "grey" }}
                        >
                          In Session: {item.is_in_session ? "🟢" : "🔴"}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="outlined"
                            sx={{ borderRadius: 3, px: 3, py: 1 }}
                            onClick={() => {
                              navigate(`/standard/${item.id}`);
                            }}
                          >
                            View
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardTeacher;
