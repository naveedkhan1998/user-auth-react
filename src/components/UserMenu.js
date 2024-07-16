// src/components/UserMenu.js
import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";

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
          Login/Register
        </MenuItem>
      ) : (
        <>
          <MenuItem component={NavLink} to="/dashboard" onClick={handleMenuCloseUser}>
            Dashboard
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleLogout();
              handleMenuCloseUser();
            }}
          >
            Logout
          </MenuItem>
        </>
      )}
    </Menu>
  );
};

export default UserMenu;
