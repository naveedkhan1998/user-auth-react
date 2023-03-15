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
    addStudentStore:(state,action) =>{
        state.students.push(action.payload)
    },
    deleteStudentStore:(state,action) =>{
        const idx = state.students.findIndex(item => item.id === action.payload.id)
        state.students.splice(idx,1)
    },
  },
})

export const { setStudents,addStudentStore,deleteStudentStore } = studentSlice.actions

export default studentSlice.reducer

export const getCurrentStudentsList = (state) => state.students.students