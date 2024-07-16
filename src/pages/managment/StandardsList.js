import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useGetStandardQuery } from "../../services/ManagmentStandardApi";
import { getStandardsList, setstandards } from "../../features/standardSlice";
import { getCurrentToken } from "../../features/authSlice";

const StandardsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access_token = useSelector(getCurrentToken);
  const { data, isSuccess, isLoading, isError } = useGetStandardQuery(access_token);
  const storeStandards = useSelector(getStandardsList);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setstandards(data.data));
    }
    // Handle error here if needed
  }, [isSuccess, data, isError, dispatch]);

  return (
    <Paper elevation={3} sx={{ borderRadius: 6, p: 3, height: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "grey" }}>
        Standards
      </Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", color: "grey" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {storeStandards?.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ borderRadius: 6, p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "grey" }}>
                  Standard: {item.standard}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1, color: "grey" }}>
                  In Session: {item.is_in_session ? "🟢" : "🔴"}
                </Typography>
                <Button variant="outlined" fullWidth sx={{ borderRadius: 3, mt: 1 }} onClick={() => navigate(`/standard/${item.id}`)}>
                  View
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
};

export default StandardsList;
