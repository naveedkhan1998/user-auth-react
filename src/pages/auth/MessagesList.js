import React, { useState, useEffect } from "react";
import { useGetMessageQuery } from "../../services/messagesApi";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentToken } from "../../features/authSlice";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
  IconButton,
  Paper,
  Pagination,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const MessagesList = () => {
  const access_token = useSelector(getCurrentToken);
  const {
    data: MessagesData,
    isLoading: LoadingMessages,
    refetch,
  } = useGetMessageQuery(access_token);

  const [page, setPage] = useState(1);
  const messagesPerPage = 3;
  const [refreshing, setRefreshing] = useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (messageId) => {
    console.log(`Delete message with ID: ${messageId}`);
  };

  const startIndex = (page - 1) * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;

  const displayedMessages =
    MessagesData?.data.slice(startIndex, endIndex) || [];

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    let intervalId;

    if (refreshing) {
      intervalId = setInterval(() => {
        handleRefresh();
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshing]);

  const toggleRefresh = () => {
    if (!refreshing) {
      // Start refreshing for 5 seconds
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 5000);
    }
  };

  return (
    <Grid item xs={12} md={12} boxShadow={3} borderRadius={3}>
      <div style={{ padding: "16px" }}>
        <Typography variant="h3" color="textSecondary">
          Messages
        </Typography>
        <Box mt={4} mx="auto" width="80%">
          <Typography variant="h5" mb={2}>
            Messages List
          </Typography>
          <ToggleButtonGroup exclusive>
            <ToggleButton
              value="refreshing"
              selected={refreshing}
              onClick={toggleRefresh}
            >
              Refreshing: {refreshing ? "On" : "Off"}
            </ToggleButton>
          </ToggleButtonGroup>
          {LoadingMessages ? (
            <CircularProgress />
          ) : (
            <div>
              <List>
                {displayedMessages.map((message) => (
                  <Paper elevation={3} sx={{ p: 2, mb: 2 }} key={message.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={"Name: " + message.name}
                        secondary={
                          <>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              component="div"
                            >
                              {"Email: " + message.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {"Message: " + message.message}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Created At: {message.created_at}
                            </Typography>
                          </>
                        }
                      />
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(message.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  </Paper>
                ))}
              </List>
              <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                  count={Math.ceil(
                    (MessagesData?.data.length || 0) / messagesPerPage
                  )}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </div>
          )}
        </Box>
      </div>
    </Grid>
  );
};

export default MessagesList;
