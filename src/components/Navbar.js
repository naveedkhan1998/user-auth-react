import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material'
import { getCurrentToken } from '../features/authSlice'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { getToken } from '../services/LocalStorageService';

const Navbar = () => {
  //const access_token = useSelector(getCurrentToken);
  const {access_token} = getToken()
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
          sx={{ color: 'white', textTransform: 'none', fontWeight: 'bold', mr: 2 }}
          activeClassName="active-link"
          onClick={handleLinkClick}
        >
          Home
        </Button>
        <Button
          component={NavLink}
          to="/contact"
          sx={{ color: 'white', textTransform: 'none', fontWeight: 'bold', mr: 2 }}
          activeClassName="active-link"
          onClick={handleLinkClick}
        >
          Contact
        </Button>
        {!access_token ? (
          <Button
            component={NavLink}
            to="/login"
            sx={{ color: 'white', textTransform: 'none', fontWeight: 'bold', mr: 2 }}
            activeClassName="active-link"
            onClick={handleLinkClick}
          >
            Login/Register
          </Button>
        ) : (
          <Button
            component={NavLink}
            to="/dashboard"
            sx={{ color: 'white', textTransform: 'none', fontWeight: 'bold', mr: 2 }}
            activeClassName="active-link"
            onClick={handleLinkClick}
          >
            Dashboard
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" color="primary" >
        <Toolbar >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            MNK-AUTH
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {renderMenuItems()}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton sx={{ color: 'white' }} onClick={handleMenuClick}>
              <AccountCircle/>
            </IconButton>
            {showMenu && renderMenuItems()}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};


export default Navbar
