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
            color: "white",
            "&.active": {
              color: "#00C8FF", // Custom active color
              fontWeight: "bold",
            },
            "&:hover": {
              backgroundColor: "#0000002F", // Light red hover background
            },
            "&.active:hover": {
              backgroundColor: "#0000002F", // Darker red hover background for active item
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
              color: "#00C8FF", // Custom active color
              fontWeight: "bold",
            },
            "&:hover": {
              backgroundColor: "#0000002F", // Light blue hover background
            },
            "&.active:hover": {
              backgroundColor: "#0000002F", // Darker blue hover background for active button
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
