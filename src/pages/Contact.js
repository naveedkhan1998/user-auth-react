import { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAddMessageMutation } from "../services/messagesApi";
import { toast } from "react-toastify";

const Contact = () => {
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    };
    const res = await addMessage(actualData);
    if (res.error) {
      //console.log(typeof(res.error.data))
      //console.log(res.error.data)
      toast("Error");
    }
    if (res.data) {
      toast(res.data.msg);
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ py: 6 }}>
      <Grid item xs={12} md={7}>
        <ContactForm
          onSubmit={handleSubmit}
          sx={{
            background: "linear-gradient(to bottom, skyblue, lavender)",
            color: "grey",
          }}
        >
          <h1>Contact Us</h1>
          <p>
            Have a question or comment? Send us a message and we'll get back to
            you as soon as possible.
          </p>
          <TextField id="name" name="name" label="name" fullWidth required />
          <TextField
            id="email"
            name="email"
            label="email"
            fullWidth
            required
            type="email"
          />
          <TextField
            id="message"
            name="message"
            label="message"
            fullWidth
            required
            multiline
            rows={4}
          />

          <Button variant="contained" type="submit">
            Send
          </Button>
        </ContactForm>
      </Grid>
      <Grid item xs={12} md={7} sx={{ py: 6 }}>
        <ContactInfo
          sx={{
            background: "linear-gradient(to bottom, lavender, pink)",
            color: "grey",
          }}
        >
          <h2>Get In Touch</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
            quam nec felis gravida, a malesuada urna tincidunt.
          </p>
          <p>Phone: +1 1234567890</p>
          <p>Email: info@example.com</p>
          <p>Address: House No.1</p>
        </ContactInfo>
      </Grid>
    </Grid>
  );
};

const ContactForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],

  "& h1": {
    marginBottom: theme.spacing(2),
  },

  "& p": {
    marginBottom: theme.spacing(2),
  },

  "& .MuiTextField-root": {
    marginBottom: theme.spacing(2),
  },

  "& .MuiButton-root": {
    marginTop: theme.spacing(2),
  },
}));

const ContactInfo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(3),
  textAlign: "center",

  "& h2": {
    marginBottom: theme.spacing(2),
  },

  "& p": {
    marginBottom: theme.spacing(1),
  },
}));
export default Contact;
