import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { getToken } from '../services/LocalStorageService'
import { AccountCircle } from '@mui/icons-material'

const Navbar = () => {
    const {access_token} = getToken()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        MNK-AUTH
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button component={NavLink} to="/" sx={{ color: 'white', textTransform: 'none', fontWeight: 'bold', mr: 2 }} activeClassName="active-link">
                            Home
                        </Button>
                        <Button component={NavLink} to="/contact" sx={{ color: 'white', textTransform: 'none', fontWeight: 'bold', mr: 2 }} activeClassName="active-link">
                            Contact
                        </Button>
                        {!access_token ? (
                            <Button component={NavLink} to="/login" sx={{ color: 'white', textTransform: 'none', fontWeight: 'bold', mr: 2 }} activeClassName="active-link">
                                Login/Register
                            </Button>
                        ) : (
                            <Button component={NavLink} to="/dashboard" sx={{ color: 'white', textTransform: 'none', fontWeight: 'bold', mr: 2 }} activeClassName="active-link">
                                Dashboard
                            </Button>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton sx={{ color: 'white' }}>
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
