import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserDetails } from "../../features/userSlice";
import { useGetStandardQuery } from "../../services/ManagmentStandardApi";
import { setstandards, getStandardsList } from "../../features/standardSlice";
import { getCurrentToken } from "../../features/authSlice";
import MessagesList from "./MessagesList";

const DashboardTeacher = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getCurrentUserDetails);
  const access_token = useSelector(getCurrentToken);

  const { data, isSuccess, isLoading, isError } =
    useGetStandardQuery(access_token);

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setstandards([...data?.data]));
    }
    if (isError) {
      // Handle error here
    }
  }, [isSuccess, data, isError]);

  const storeStandards = useSelector(getStandardsList);

  return (
    <>
      <Grid
        boxShadow={3}
        borderRadius={3}
        padding={3}
        sx={{
          background: "#F6E9E9",
          marginBottom: "20px",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6} boxShadow={3} borderRadius={3}>
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
                sx={{ fontWeight: "bold", mb: 2, color: "grey" }}
              >
                Main Dashboard
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
                  Name: {userData.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "grey" }}>
                  Email: {userData.email}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} boxShadow={3} borderRadius={3}>
            <Box
              sx={{
                background: "#F6E9E9",
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
                          background: "#F6E9E9",
                          borderRadius: 3,
                          p: 3,
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
          <Grid item xs={12} md={12} boxShadow={3} borderRadius={3}>
            <div style={{ padding: "16px" }}>
              <Typography variant="h3" color="textSecondary">
                Messages
              </Typography>
              <MessagesList />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardTeacher;
