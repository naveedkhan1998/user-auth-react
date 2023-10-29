import React, { useState } from "react";
import { useGetMessageQuery } from "../../services/messagesApi";
import { useSelector } from "react-redux";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const MessagesList = () => {
  const access_token = useSelector(getCurrentToken);
  const { data: MessagesData, isLoading: LoadingMessages } =
    useGetMessageQuery(access_token);

  const [page, setPage] = useState(1);
  const messagesPerPage = 3;

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

  return (
    <Box mt={4} mx="auto" width="80%">
      <Typography variant="h5" mb={2}>
        Messages List
      </Typography>
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
  );
};

export default MessagesList;
