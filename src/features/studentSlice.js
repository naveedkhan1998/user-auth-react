import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    students:[]
  
}

export const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents:(state,action) =>{
        state.students = action.payload.students
    },
    addStudent:(state,payload) =>{
        state.push(payload)
    },
    deleteStudent:(state) =>{
        state = initialState
    },
  },
})

export const { setStudents,addStudent,deleteStudent } = studentSlice.actions

export default studentSlice.reducer