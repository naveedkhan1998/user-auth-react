import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useGetStandardQuery } from "../../services/ManagmentStandardApi";
import { getStandardsList, setstandards } from "../../features/standardSlice";
import { getCurrentToken } from "../../features/authSlice";

const StandardsList = () => {
  const dispatch = useDispatch();
  const access_token = useSelector(getCurrentToken);
  const navigate = useNavigate();

  const { data, isSuccess, isLoading, isError } =
    useGetStandardQuery(access_token);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setstandards([...data.data]));
    }
    if (isError) {
      // Handle error here
    }
  }, [isSuccess, data, isError]);

  const storeStandards = useSelector(getStandardsList);

  return (
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
  );
};

export default StandardsList;
