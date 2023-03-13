import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  useGetStudentQuery,
  useDeleteStudentMutation,
  useAddStudentMutation,
} from '../../services/ManagmentApi'
import { removeToken, getToken } from '../../services/LocalStorageService'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

const StudentsList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Retrieve access token from local storage
  const { access_token } = getToken()

  // Call API to get student data
  const { data, isSuccess, isLoading, isError, error } = useGetStudentQuery(access_token)

  // Call API to delete a student
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation()

  // Call API to add a new student
  const [addStudent, { isLoading: isAdding }] = useAddStudentMutation()

  // Form state
  const [name, setName] = useState('')
  const [standard, setStandard] = useState('')
  const [section, setSection] = useState('')
  const [open, setOpen] = useState(false)

  const handleDeleteStudent = async (id) => {
    await deleteStudent({ id,access_token })
  }

  const handleAddStudent = async () => {
    const actualData = {
        name:name,
        standard:standard,
        section:section
    }
    await addStudent({ actualData,access_token })
    handleClose()
    // Call API to get student data
    
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data)
    }
    if (isError) {
      // Handle error here
    }
  }, [isSuccess, data, isError])

  return <>
    <Container>
      <CssBaseline />
      <Box my={4}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add Student
          </Button>
        </Box>
        <hr color="red" size="5" width="100%"></hr>
        <Grid container spacing={2}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            data?.students?.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Box borderRadius={9} sx={{ border: '1px solid grey', p: 2 }}>
                  <Typography variant="h6">Name:{item.name}</Typography>
                  <Typography>Standard:{item.standard}</Typography>
                  <Typography>Section:{item.section}</Typography>
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
                      View Details
                    </Button>
                    <IconButton
                      onClick={() => handleDeleteStudent(item.id)}
                      disabled={isDeleting}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
               
                  </Box>
          </Grid>
        ))
      )}
    </Grid>

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details of the new student.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="standard"
          label="Standard"
          type="text"
          fullWidth
          value={standard}
          onChange={(e) => setStandard(e.target.value)}
        />
        <TextField
          margin="dense"
          id="section"
          label="Section"
          type="text"
          fullWidth
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddStudent} disabled={isAdding}>
          {isAdding ? <CircularProgress size={24} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
</Container>

</>
}
export default StudentsList
