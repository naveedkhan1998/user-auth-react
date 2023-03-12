import { useState } from 'react';
import { Grid, Card, Tabs, Tab, Box, Typography } from '@mui/material';
import { Person, PersonAdd } from '@mui/icons-material';
import UserLogin from './UserLogin';
import UserRegistration from './UserRegistration';
import { useSpring, animated } from 'react-spring';

const TabPanel = ({ children, value, index }) => {
  return (
    <Box hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

const LoginReg = () => {
  const [value, setValue] = useState(0);
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <animated.div style={fade}>
      <Grid container justifyContent='center' sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ borderRadius: '12px' }}>
            <Box sx={{ padding: '24px' }}>
              <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 2 }}>
                Welcome back!
              </Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor='secondary'
                indicatorColor='primary'
                variant='fullWidth'
              >
                <Tab
                  icon={<Person />}
                  label='Login'
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                />
                <Tab
                  icon={<PersonAdd />}
                  label='Sign Up'
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                />
              </Tabs>
              <TabPanel value={value} index={0}>
                <UserLogin />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <UserRegistration />
              </TabPanel>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </animated.div>
  );
};

export default LoginReg;
