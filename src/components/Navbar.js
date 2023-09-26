import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { getCurrentToken, logOut } from "../features/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuBookOutlined,Menu } from "@mui/icons-material";
import { getToken, removeToken } from "../services/LocalStorageService";
import { unSetUserInfo } from "../features/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  //const access_token = useSelector(getCurrentToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    //console.log("logout clicked")
    toast("Logged Out");
    dispatch(unSetUserInfo());
    dispatch(logOut());
    removeToken();
    navigate("/login");
  };
  const { access_token } = getToken();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLinkClick = () => {
    setShowMenu(false);
  };

  const renderMenuItems = () => {
    return (
      <Box>
        <Button
          component={NavLink}
          to="/"
          sx={{
            color: "grey",
            textTransform: "none",
            fontWeight: "bold",
            mr: 2,
          }}
          activeClassName="active-link"
          onClick={handleLinkClick}
        >
          Home
        </Button>
        <Button
          component={NavLink}
          to="/contact"
          sx={{
            color: "grey",
            textTransform: "none",
            fontWeight: "bold",
            mr: 2,
          }}
          activeClassName="active-link"
          onClick={handleLinkClick}
        >
          Contact
        </Button>
        {!access_token ? (
          <Button
            component={NavLink}
            to="/login"
            sx={{
              color: "grey",
              textTransform: "none",
              fontWeight: "bold",
              mr: 2,
            }}
            activeClassName="active-link"
            onClick={handleLinkClick}
          >
            Login/Register
          </Button>
        ) : (
          <>
            <Button
              component={NavLink}
              to="/dashboard"
              sx={{
                color: "grey",
                textTransform: "none",
                fontWeight: "bold",
                mr: 2,
              }}
              activeClassName="active-link"
              onClick={handleLinkClick}
            >
              Dashboard
            </Button>
            <Button
              onClick={handleLogout} // Add a click handler for logout
              sx={{
                color: "grey",
                textTransform: "none",
                fontWeight: "bold",
                mr: 2,
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="primary"
        style={{
          background: "linear-gradient(to top, skyblue, lavender, pink)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "gray" }}
          >
            Django-React-App
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              background: "linear-gradient(to top, skyblue, lavender, pink)",
              borderRadius: "50px",
            }}
          >
            {renderMenuItems()}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton sx={{ color: "black" }} onClick={handleMenuClick}>
              <Menu />
            </IconButton>
            {showMenu && renderMenuItems()}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
