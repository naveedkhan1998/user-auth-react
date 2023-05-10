import React, { useState,useEffect } from 'react';
import { useFetcher, useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { getCurrentUserDetails } from '../../features/userSlice';
import { setStudents } from '../../features/studentSlice';
import { getCurrentStudentsList } from '../../features/studentSlice';
import { getToken } from '../../services/LocalStorageService';
import { useNavigate } from 'react-router-dom';
import { useGetStudentQuery } from '../../services/ManagmentStudentsApi';
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    Typography,
  } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

const StudentsInStandardList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(getCurrentUserDetails)
    console.log(userData)
    
    useEffect(()=>{
        if (!userData.is_teacher){
            navigate('/dashboard')
        }
    },[userData])

    const {id} = useParams()
    //const access_token = useSelector(getCurrentToken)
    const access_token = getToken()
    const {data,isSuccess,isLoading,isError} = useGetStudentQuery(id,access_token)

    useEffect(()=>{
        if (isSuccess && data){
            dispatch(setStudents({id:id,data:data.data}))
        }
    },[isSuccess, data, isError])

    const all_students = useSelector(getCurrentStudentsList)
    const students = all_students.find(obj=>obj.id === id)
    console.log(students)
    


    

  return <>
  
    <Grid container spacing={2}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            students?.data.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Box borderRadius={9} sx={{ border: '1px solid grey', p: 2 }}>
                  <Typography variant="h6">Name:{item.name}</Typography>
                  <Typography>Standard:{item.standard.standard}</Typography>
                  <Typography>In Session: {item.is_in_session?'True':'False'}</Typography>
                  
                  <Box
                    mt={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      //onClick={() => navigate(`/students/${item.id}`)}
                    >
                      Details
                    </Button>
                  </Box>
               
                  </Box>
          </Grid>
        ))
      )}
    </Grid>
  
  </>
}

export default StudentsInStandardList
