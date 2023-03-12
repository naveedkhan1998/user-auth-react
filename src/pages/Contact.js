import { Grid, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Grid container justifyContent="center" spacing={3}>
      <Grid item xs={12} md={6}>
        <ContactForm onSubmit={handleSubmit}>
          <h1>Contact Us</h1>
          <p>Have a question or comment? Send us a message and we'll get back to you as soon as possible.</p>
          <TextField label="Name" fullWidth required />
          <TextField label="Email" fullWidth required type="email" />
          <TextField label="Message" fullWidth required multiline rows={4} />
          <Button variant="contained" type="submit">
            Send
          </Button>
        </ContactForm>
      </Grid>
      <Grid item xs={12} md={6}>
        <ContactInfo>
          <h2>Get In Touch</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam nec felis gravida, a malesuada urna
            tincidunt.
          </p>
          <p>Phone: +91 99999999</p>
          <p>Email: info@example.com</p>
          <p>Address: House No.1</p>
        </ContactInfo>
      </Grid>
    </Grid>
  );
};

const ContactForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],

  '& h1': {
    marginBottom: theme.spacing(2),
  },

  '& p': {
    marginBottom: theme.spacing(2),
  },

  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },

  '& .MuiButton-root': {
    marginTop: theme.spacing(2),
  },
}));

const ContactInfo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(3),
  textAlign: 'center',

  '& h2': {
    marginBottom: theme.spacing(2),
  },

  '& p': {
    marginBottom: theme.spacing(1),
  },
}));
export default Contact