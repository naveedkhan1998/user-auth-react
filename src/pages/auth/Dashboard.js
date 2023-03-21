import { Box, Button,CssBaseline,Grid,Typography,Paper } from '@mui/material'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../features/authSlice'
import { getToken, removeToken } from '../../services/LocalStorageService'
import ChangePassword from './ChangePassword'
import { useGetLoggedUserQuery } from '../../services/UserAuthApi'
import { useEffect, useState } from 'react'
import { setUserInfo, unSetUserInfo,getCurrentUserDetails } from '../../features/userSlice'
import { Container } from '@mui/system'
import StudentsList from './StudentsList'
import { getCurrentToken } from '../../features/authSlice'
import { toast } from 'react-toastify';
import {Avatar} from '@mui/material'

const Dashboard = () => {

    const handleLogout = () => {
        //console.log("logout clicked")
        toast("Logged Out")
        dispatch(unSetUserInfo())
        dispatch(logOut())
        removeToken()
        navigate('/login')
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {access_token} = getToken()
    //const access_token = useSelector(getCurrentToken)
    
    const {data,isSuccess} = useGetLoggedUserQuery(access_token)
    //const {data,isSuccess} = useGetStudentQuery(access_token)
    
    

    /* const [userData,setUserData] = useState({
        email:'',
        name:'',
        is_staff:false,
        avatar:''
    })

    useEffect(() =>{
        if (data && isSuccess){
        setUserData({
            email:data.email,
            name:data.name,
            is_staff:data.is_staff,
            avatar:data.avatar,
        })
    }
    },[data,isSuccess]) */

    useEffect(()=>{
        if (data && isSuccess){
            dispatch(setUserInfo({
                email:data.email,
                name:data.name,
                is_teacher:data.is_teacher,
                avatar:data.avatar,
            }))
        }
    },[data,isSuccess,dispatch])

    const userData = useSelector(getCurrentUserDetails)

  return <>
    <CssBaseline >
        {userData.is_teacher?
        <Container sx={{ backgroundColor: '#f5deb3', py: 12, px: 4 }}>
            <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={12} sx={{ backgroundColor: '#654321', borderRadius: 9, py: 4 }}>
                    <Typography variant="h3" align="center" sx={{ color: '#f5deb3' }}>
                    Teacher Dashboard
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ backgroundColor: '#654321', borderRadius: 9, py: 4 }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Avatar alt="User Profile" src={userData.avatar} sx={{ width: 100, height: 100 }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" sx={{ color: '#f5deb3' }}>
                        Email: {userData.email}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#f5deb3' }}>
                        Name: {userData.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="warning" size="large" onClick={handleLogout} sx={{ mt: 4 }}>
                        Logout
                        </Button>
                    </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8} sx={{ borderRadius: 9, py: 4 }}>
                    <ChangePassword />
                </Grid>
                <Grid item xs={12} sx={{ backgroundColor: '#654321', borderRadius: 9, py: 4 }}>
                    <Typography variant="h3" align="center" sx={{ color: '#f5deb3' }}>
                    Students
                    </Typography>
                </Grid>
            </Grid>
      </Container>
        :
        <Container sx={{ backgroundColor: '#f5deb3', py: 12, px: 4 }}>
            <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={12} sx={{ backgroundColor: '#654321', borderRadius: 9, py: 4 }}>
                    <Typography variant="h3" align="center" sx={{ color: '#f5deb3' }}>
                    Parent Dashboard
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ backgroundColor: '#654321', borderRadius: 9, py: 4 }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Avatar alt="User Profile" src={userData.avatar} sx={{ width: 100, height: 100 }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" sx={{ color: '#f5deb3' }}>
                        Email: {userData.email}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#f5deb3' }}>
                        Name: {userData.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="warning" size="large" onClick={handleLogout} sx={{ mt: 4 }}>
                        Logout
                        </Button>
                    </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8} sx={{ borderRadius: 9, py: 4 }}>
                    <ChangePassword />
                </Grid>
                <Grid item xs={12} sx={{ backgroundColor: '#654321', borderRadius: 9, py: 4 }}>
                    <Typography variant="h3" align="center" sx={{ color: '#f5deb3' }}>
                    Students
                    </Typography>
                </Grid>
            </Grid>
      </Container>
            }

        
    </CssBaseline>
  </>
}

export default Dashboard;
