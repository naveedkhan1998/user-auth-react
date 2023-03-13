import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    students:[]
  
}

export const studentSlice = createSlice({
  name: 'student_info',
  initialState,
  reducers: {
    setStudentInfo:(state,action) =>{
        const {id,name} = action.payload
        return {
          ...state,
          data:[
            ...state.students,
            {
              id:id,
              name:name
            }
          ]
        }
        state.name = action.payload.name
    },
    unSeStudentInfo:(state,action) =>{
        state.name = action.payload.name
    },
  },
})

export const { setStudentInfo,unSeStudentInfo } = studentSlice.actions

export default studentSlice.reducer