import React from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const UserMenu = ({ anchorElUser, handleMenuCloseUser, access_token, handleLogout }) => {
  return (
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
      {!access_token ? (
        <MenuItem component={NavLink} to="/login" onClick={handleMenuCloseUser}>
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Login/Register" />
        </MenuItem>
      ) : (
        <>
          <MenuItem component={NavLink} to="/dashboard" onClick={handleMenuCloseUser}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleLogout();
              handleMenuCloseUser();
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </>
      )}
    </Menu>
  );
};

export default UserMenu;
