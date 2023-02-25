import { AppBar,Box,Toolbar,Typography,Button } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { getToken } from '../services/LocalStorageService'

const Navbar = () => {
    const {access_token} = getToken()
  return <>
    <Box sx={{felxGrow:1}}>
        <AppBar position="static" style={{backgroundColor:'green'}}>
            <Toolbar>
                <Typography variant='h5' component='div' sx={{flexGrow:1}}>
                    MNK-AUTH
                </Typography>
                <Button component={NavLink} to='/' style= {({isActive}) => 
                {return{backgroundColor:isActive ?'cyan':''}}} sx={{color:'black',textTransform:'None'}}>
                    Home
                </Button>
                <Button component={NavLink} to='/contact' style= {({isActive}) => 
                {return{backgroundColor:isActive ?'cyan':''}}}sx={{color:'black',textTransform:'None'}}>
                    Contact
                </Button>
                {!access_token?<Button component={NavLink} to='/login' style= {({isActive}) => 
                {return{backgroundColor:isActive ?'cyan':''}}}sx={{color:'black',textTransform:'None'}}>
                    Login/Register
                </Button>:<Button component={NavLink} to='/dashboard' style= {({isActive}) => 
                {return{backgroundColor:isActive ?'cyan':''}}}sx={{color:'black',textTransform:'None'}}>
                    DashBoard
                </Button>}
                
            </Toolbar>
        </AppBar>
    
    </Box>
  </>
}

export default Navbar
