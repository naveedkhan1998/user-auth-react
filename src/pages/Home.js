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
    <Container>
      <Grid container justifyContent="flex-end" sx={{ py: 8, mx: 'auto' }}>
        <Grid item xs={12} md={6} sx={{ borderRadius: 9, py: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4, mt: 4 }}>
            Welcome to Master Mind Institute
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
          At Master Mind Institute, we believe that every student is unique and has their own learning style. Our experienced and highly qualified 
          faculty members understand this and provide personalized attention to each student to help them reach their full potential.
          We offer a comprehensive range of courses that cover all major subjects, including Mathematics, Science, Social Studies, English, 
          and more. Our courses are designed to cater to the individual needs of each student and help them excel in their academics.
          Our state-of-the-art facilities and technology-enabled classrooms provide a conducive learning environment for students. We use the latest 
          teaching methods and tools to make learning engaging and interactive for our students.
          We take pride in our track record of producing outstanding results and helping students achieve their academic and 
          personal goals. Our students have gone on to excel in their chosen fields and become successful individuals.
          Join us at Master Mind Institute and let us help you unlock your full potential and achieve your dreams.
          </Typography>
          <Button variant="contained" component={Link} to="/contact" sx={{ mt: 2, px: 4, py: 2 }}>
            Contact Us
          </Button>
        </Grid>
        <Grid item xs={12} md={6} sx={{  borderRadius: 9, py: 4 }}>
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
