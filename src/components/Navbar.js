import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuBookOutlined } from "@mui/icons-material";
import { unSetUserInfo } from "../features/userSlice";
import { toast } from "react-toastify";
import { getCurrentToken, logOut } from "../features/authSlice";
import { getToken, removeToken } from "../services/LocalStorageService";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = getToken();
  const [anchorEl, setAnchorEl] = useState(null);

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

  const renderMenuItems = () => (
    <>
      <MenuItem component={NavLink} to="/" onClick={handleMenuClose}>
        Home
      </MenuItem>
      <MenuItem component={NavLink} to="/contact" onClick={handleMenuClose}>
        Contact
      </MenuItem>
      {!access_token ? (
        <MenuItem component={NavLink} to="/login" onClick={handleMenuClose}>
          Login/Register
        </MenuItem>
      ) : (
        <>
          <MenuItem
            component={NavLink}
            to="/dashboard"
            onClick={handleMenuClose}
          >
            Dashboard
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </>
      )}
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" sx={{ background: "#363333" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "#F6E9E9",
            }}
          >
            User Auth Application
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              background: "#363333",
              borderRadius: "50px",
            }}
          >
            {renderMenuItems()}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton sx={{ color: "#F6E9E9" }} onClick={handleMenuClick}>
              <MenuBookOutlined />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {renderMenuItems()}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
