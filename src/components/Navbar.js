import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Tooltip,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { getCurrentUserDetails, unSetUserInfo } from "../features/userSlice";
import { toast } from "react-toastify";
import { logOut } from "../features/authSlice";
import { getToken, removeToken } from "../services/LocalStorageService";
import AccountCircle from "@mui/icons-material/AccountCircle";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = getToken();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useSelector(getCurrentUserDetails);

  const handleLogout = () => {
    toast("Logged Out");
    dispatch(unSetUserInfo());
    dispatch(logOut());
    removeToken();
    navigate("/login");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClickUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleMenuCloseUser = () => {
    setAnchorElUser(null);
  };

  const renderMenuItems = () => (
    <>
      <MenuItem component={NavLink} to="/" onClick={handleMenuClose}>
        Home
      </MenuItem>
      <MenuItem component={NavLink} to="/about" onClick={handleMenuClose}>
        About Me
      </MenuItem>
      <MenuItem component={NavLink} to="/contact" onClick={handleMenuClose}>
        Contact
      </MenuItem>
    </>
  );

  const renderItemsUser = () => {
    return (
      <>
        {!access_token ? (
          <MenuItem component={NavLink} to="/login" onClick={handleMenuCloseUser}>
            Login/Register
          </MenuItem>
        ) : (
          <>
            <MenuItem
              component={NavLink}
              to="/dashboard"
              onClick={handleMenuCloseUser}
            >
              Dashboard
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        )}
      </>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: "#2f3133" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              User-Auth-React
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton sx={{ color: "#F6E9E9" }} onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {renderMenuItems()}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              User-Auth-React
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {renderMenuItems()}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="User settings">
                <IconButton onClick={handleMenuClickUser} sx={{ p: 0 }}>
                  {access_token ? (
                    <Avatar
                      alt="user-avatar"
                      src={`https://ui-avatars.com/api/?background=random&name=${user.name}`}
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleMenuCloseUser}
              >
                {renderItemsUser()}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
