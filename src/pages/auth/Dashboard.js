import { Button,CssBaseline,Grid,Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { unSetUserToken } from '../../features/authSlice'
import { getToken, removeToken } from '../../services/LocalStorageService'
import ChangePassword from './ChangePassword'
import { useGetLoggedUserQuery } from '../../services/UserAuthApi'
import { useEffect, useState } from 'react'
import { setUserInfo, unSetUserInfo } from '../../features/userSlice'
import { Container } from '@mui/system'
import { useGetStudentQuery } from '../../services/ManagmentApi'
import StudentsList from './StudentsList'

import Grid2 from '@mui/material/Unstable_Grid2/Grid2'


const Dashboard = () => {

    const handleLogout = () => {
        //console.log("logout clicked")
        dispatch(unSetUserInfo({name:"",email:""}))
        dispatch(unSetUserToken({access_token:null}))
        removeToken()
        navigate('/login')
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {access_token} = getToken()
    
    const {data,isSuccess} = useGetLoggedUserQuery(access_token)
    //const {data,isSuccess} = useGetStudentQuery(access_token)
    
    

    const [userData,setUserData] = useState({
        email:"",
        name:""
    })

    useEffect(() =>{
        if (data && isSuccess){
        setUserData({
            email:data.email,
            name:data.name,
        })
    }
    },[data,isSuccess])

    useEffect(()=>{
        if (data && isSuccess){
            dispatch(setUserInfo({
                email:data.email,
                name:data.name,
            }))
        }
    },[data,isSuccess,dispatch])

  return <>
    <CssBaseline>
        <Container >
        <Grid container >
            <Grid item borderRadius={9} sm={4} sx={{backgroundColor:'gray',p:5,color:'white'}}>
                <h1>DashBoard</h1>
                <Typography variant='h5'>Email: {userData.email}</Typography>
                <Typography variant='h6'>Name: {userData.name}</Typography>
                <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{mt:8}}> Logout</Button>
            </Grid>
            <Grid item sm={8} borderRadius={9}>
                <ChangePassword/>
            </Grid>
        </Grid>
        <Grid container borderRadius={9} sx={{backgroundColor:'#f08354',p:5,color:'white'}}>
            <Typography variant='h2'>Students</Typography>
        </Grid>
        <Grid container>
            <StudentsList/>
        </Grid>
        
        </Container>
    </CssBaseline>
  </>
}

export default Dashboard;
