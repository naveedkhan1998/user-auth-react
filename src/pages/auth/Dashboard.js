import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetLoggedUserQuery } from '../../services/UserAuthApi';
import { setUserInfo } from '../../features/userSlice';
import { getCurrentUserDetails } from '../../features/userSlice';
import { getToken } from '../../services/LocalStorageService';
import ChangePassword from './ChangePassword';
import DashboardTeacher from './DashboardTeacher';
import DashboardParent from './DashboardParent';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const userData = useSelector(getCurrentUserDetails);

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.email,
        name: data.name,
        is_teacher: data.is_teacher,
        avatar: data.avatar,
      }));
    }
  }, [data, isSuccess, dispatch]);

  return (
    <>
      <CssBaseline />
      <Grid container spacing={3} sx={{ p: 6 }}>
        <Grid item xs={12}>
          {userData.is_teacher ? <DashboardTeacher /> : <DashboardTeacher />}
        </Grid>
        <Grid item xs={12}>
          <PasswordChangeAccordion />
        </Grid>
      </Grid>
    </>
  );
};

const PasswordChangeAccordion = () => (
  <Accordion sx={{ margin: 6 }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ color: 'grey' }} />}
      sx={{ background: '#F6E9E9' }}
    >
      <Typography variant="h6" sx={{ pl: 3, color: 'grey' }}>
        Change password
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ background: '#F6E9E9', padding: 6 }}>
      <ChangePassword />
    </AccordionDetails>
  </Accordion>
);

export default Dashboard;