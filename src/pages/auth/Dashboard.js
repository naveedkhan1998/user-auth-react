import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/authSlice";
import { getToken, removeToken } from "../../services/LocalStorageService";
import ChangePassword from "./ChangePassword";
import { useGetLoggedUserQuery } from "../../services/UserAuthApi";
import { useEffect, useState } from "react";
import {
  setUserInfo,
  unSetUserInfo,
  getCurrentUserDetails,
} from "../../features/userSlice";
import { Container } from "@mui/system";
import StudentsList from "./StudentsList";
import { getCurrentToken } from "../../features/authSlice";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";
import DashboardTeacher from "./DashboardTeacher";
import DashboardParent from "./DashboardParent";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = getToken();
  //const access_token = useSelector(getCurrentToken)

  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
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

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          email: data.email,
          name: data.name,
          is_teacher: data.is_teacher,
          avatar: data.avatar,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  const userData = useSelector(getCurrentUserDetails);

  return (
    <>
      <CssBaseline />
      {/* Main content */}
      <Grid container spacing={3} sx={{ p: 4 }}>
        <Grid item xs={12}>
          {/* {userData.is_teacher ? <DashboardTeacher /> : <DashboardParent />}   later when done building completely fix it*/}
          {userData.is_teacher ? <DashboardTeacher /> : <DashboardTeacher />}
        </Grid>
      </Grid>

      {/* Change password dropdown */}
      <Accordion sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Change password</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ChangePassword />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Dashboard;
