import { useState, useEffect } from 'react'
import { Grid, Typography, Button,Container } from '@mui/material'
import { Link } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'

function Home() {
  const [images, setImages] = useState([])

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch('https://api.unsplash.com/photos/random?count=5', {
        headers: {
          Authorization: 'Client-ID RIWJyQVUgDibIWwP4tPV7pyCvY-kH-BvVLBKxR7zSuA'
        }
      })
      const data = await response.json()
      const urls = data.map(item => item.urls.regular)
      setImages(urls)
    }
    fetchImages()
  }, [])

  return <>
    <Container maxWidth="lg">
      <Grid container justifyContent="flex-end" sx={{ py: 8, mx: 'auto' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4, mt: 4 }}>
            Welcome to Our Website
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Our website is built using a two-tier architecture, with a Django backend and a React frontend. 
            The Django backend provides the server-side functionality, including database management and API development, 
            while the React frontend provides the client-side user interface and user experience. This architecture allows 
            for a scalable, modular, and maintainable application, with a separation of concerns between the front and back ends. 
            Django is a popular and robust web framework written in Python, which provides a wide range of features for building 
            web applications, while React is a widely-used JavaScript library for building modern and dynamic user interfaces. 
            Together, our two-tier website with a Django backend and React frontend offers a powerful and flexible platform for 
            building high-quality web applications.
          </Typography>
          <Button variant="contained" component={Link} to="/contact" sx={{ mt: 2, px: 6, py: 3 }}>
            Contact Us
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Carousel indicators={false}>
            {images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Carousel Image ${index}`}
                sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Container>

</>
}

export default Home
