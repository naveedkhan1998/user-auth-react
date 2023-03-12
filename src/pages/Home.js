import { Grid, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <Grid container justifyContent="center" sx={{ my: 4 }}>
      <Grid item xs={12} md={10}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis tellus sit amet mauris vehicula, sed
          hendrerit nulla ultrices. Sed lacinia iaculis augue, in congue lacus consequat at. Duis ut volutpat sapien.
          Donec lacinia eros et leo commodo feugiat. Sed laoreet justo auctor, malesuada est at, faucibus augue.
          Suspendisse potenti. Nulla facilisi. Aenean ornare, sapien non malesuada molestie, nisi mi interdum eros, quis
          consequat justo velit eget felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
          ac turpis egestas.
        </Typography>
        <Button variant="contained" component={Link} to="/contact" sx={{ mt: 4 }}>
          Contact Us
        </Button>
      </Grid>
    </Grid>
  )
}

export default Home
