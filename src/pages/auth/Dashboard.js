import { Button,CssBaseline,Grid,Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { unSetUserToken } from '../../features/authSlice'
import { getToken, removeToken } from '../../services/LocalStorageService'
import ChangePassword from './ChangePassword'
import { useGetLoggedUserQuery } from '../../services/UserAuthApi'
import { useEffect, useState } from 'react'
import { setUserInfo, unSetUserInfo } from '../../features/userSlice'

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
    //console.log(data)
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
        <Grid container>
            <Grid item sm={4} sx={{backgroundColor:'gray',p:5,color:'white'}}>
                <h1>DashBoard</h1>
                <Typography variant='h5'>Email: {userData.email}</Typography>
                <Typography variant='h6'>Name: {userData.name}</Typography>
                <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{mt:8}}> Logout</Button>
            </Grid>
            <Grid item sm={8} >
                <ChangePassword/>
            </Grid>
        </Grid>
    </CssBaseline>
  </>
}

export default Dashboard;
