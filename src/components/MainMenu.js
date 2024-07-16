// src/components/MainMenu.js
import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";

const MainMenu = ({ anchorEl, handleMenuClose, isMobile }) => {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About Me", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const renderMenuItems = () =>
    menuItems.map((item) => (
      <MenuItem
        key={item.path}
        component={NavLink}
        to={item.path}
        onClick={handleMenuClose}
        sx={{
          color: "inherit",
          "&.active": {
            color: "secondary.main",
            fontWeight: "bold",
          },
        }}
      >
        {item.label}
      </MenuItem>
    ));

  if (isMobile) {
    return (
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
      >
        {renderMenuItems()}
      </Menu>
    );
  }

  return renderMenuItems();
};

export default MainMenu;
