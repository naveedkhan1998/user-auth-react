import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: null,
    data: [],
  },
];

/* {
  objects:[{
  id:'',
  data:[]
  }]
} */

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      const { id, data } = action.payload;
      const checkIfItExists = state.findIndex((obj) => obj.id === id);
      if (checkIfItExists !== -1) {
        try {
          state[id].data = data;
        } catch (error) {
          //console.log('error in slice student')
        }
      } else {
        state.push({ id, data });
      }

      //state.data.add({id:id,data:data})
    },
    addStudentStore: (state, action) => {
      state.push(action.payload);
    },
    deleteStudentStore: (state, action) => {
      const idx = state.students.findIndex(
        (item) => item.id === action.payload.id
      );
      state.splice(idx, 1);
    },
  },
});

export const { setStudents, addStudentStore, deleteStudentStore } =
  studentSlice.actions;

export default studentSlice.reducer;

export const getCurrentStudentsList = (state) => state.students;
