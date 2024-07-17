import React from "react";
import { Button, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const MainMenu = ({ isMobile }) => {
  const menuItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "About Me", path: "/about", icon: <InfoIcon /> },
    { label: "Contact", path: "/contact", icon: <ContactMailIcon /> },
  ];

  const renderMenuItems = () =>
    menuItems.map((item) =>
      isMobile ? (
        <ListItem
          key={item.path}
          component={NavLink}
          to={item.path}
          sx={{
            color: "primary.main",
            "&.active": {
              color: "secondary.main",
              fontWeight: "bold",
            },
            "&:hover": {
              backgroundColor: "rgba(106, 27, 154, 0.1)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ) : (
        <Button
          key={item.path}
          component={NavLink}
          to={item.path}
          sx={{
            color: "white",
            mx: 1,
            "&.active": {
              color: "secondary.main",
              fontWeight: "bold",
            },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
          startIcon={item.icon}
        >
          {item.label}
        </Button>
      )
    );

  return isMobile ? <List sx={{ width: "100%" }}>{renderMenuItems()}</List> : <>{renderMenuItems()}</>;
};

export default MainMenu;
