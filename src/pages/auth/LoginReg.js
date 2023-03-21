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
      <Grid container justifyContent='center' sx={{ py: 8, mx: 'auto', maxWidth: 'auto' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ borderRadius: '12px',backgroundColor: "#f5deb3"} }>
            <Box sx={{ padding: '24px' }}>
              <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 2,color: "#654321" }}>
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
                  sx={{ textTransform: 'none', fontWeight: 'bold',color: "#654321" }}
                />
                <Tab
                  icon={<PersonAdd />}
                  label='Sign Up'
                  sx={{ textTransform: 'none', fontWeight: 'bold',color: "#654321" }}
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
