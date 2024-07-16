import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Container, Avatar, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { getCurrentUserDetails, unSetUserInfo } from "../features/userSlice";
import { toast } from "react-toastify";
import { logOut } from "../features/authSlice";
import { getToken, removeToken } from "../services/LocalStorageService";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = getToken();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useSelector(getCurrentUserDetails);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    toast("Logged Out");
    dispatch(unSetUserInfo());
    dispatch(logOut());
    removeToken();
    navigate("/login");
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const renderMenuItems = () =>
    menuItems.map((item) => (
      <Button
        key={item.path}
        component={NavLink}
        to={item.path}
        sx={{
          color: "inherit",
          mx: 1,
          "&.active": {
            borderBottom: "2px solid",
            borderColor: "secondary.main",
          },
        }}
      >
        {item.label}
      </Button>
    ));

  const renderMobileMenuItems = () =>
    menuItems.map((item) => (
      <ListItem button key={item.path} component={NavLink} to={item.path} onClick={() => setDrawerOpen(false)}>
        <ListItemText primary={item.label} />
      </ListItem>
    ));

  return (
    <AppBar position="fixed" sx={{ background: "#1e1e1e" }}>
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
              color: "inherit",
              textDecoration: "none",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            UserAuth
          </Typography>

          {isMobile ? (
            <>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation">
                  <List>{renderMobileMenuItems()}</List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>{renderMenuItems()}</Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            {access_token ? (
              <>
                <Button component={NavLink} to="/dashboard" sx={{ color: "inherit", mr: 2 }}>
                  Dashboard
                </Button>
                <Button onClick={handleLogout} sx={{ color: "inherit" }}>
                  Logout
                </Button>
                <Avatar alt="user-avatar" src={`https://ui-avatars.com/api/?background=random&name=${user.name}`} sx={{ ml: 2 }} />
              </>
            ) : (
              <Button
                component={NavLink}
                to="/login"
                sx={{
                  color: "white",
                  backgroundColor: "secondary.main",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
