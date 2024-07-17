import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, IconButton, Container, Avatar, useMediaQuery, useTheme, Drawer, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { getCurrentUserDetails, unSetUserInfo } from "../features/userSlice";
import { toast } from "react-toastify";
import { logOut } from "../features/authSlice";
import { getToken, removeToken } from "../services/LocalStorageService";
import MainMenu from "./MainMenu";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = getToken();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const user = useSelector(getCurrentUserDetails);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  const handleLogout = () => {
    toast.success("Logged Out Successfully");
    dispatch(unSetUserInfo());
    dispatch(logOut());
    removeToken();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#343a40", // Darker background color for a modern look
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        color: "white",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            UserAuth
          </Typography>

          {isMobile ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
              <MainMenu isMobile={isMobile} />
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            {access_token ? (
              <>
                <IconButton onClick={handleUserMenuOpen} sx={{ p: 0 }}>
                  <Avatar alt="user-avatar" src={`https://ui-avatars.com/api/?background=random&name=${user.name}`} sx={{ border: "2px solid white" }} />
                </IconButton>
                <UserMenu anchorElUser={userMenuAnchor} handleMenuCloseUser={handleUserMenuClose} access_token={access_token} handleLogout={handleLogout} />
              </>
            ) : (
              <Button
                component={NavLink}
                to="/login"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#495057", // Dark grey for drawer background
          },
        }}
      >
        <Box
          sx={{
            width: 250,
            height: "100%",
            padding: "20px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <MainMenu isMobile={true} />
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
