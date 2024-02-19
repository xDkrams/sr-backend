// LoginForm.js
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  CssBaseline,
  Avatar,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post(
        "https://sr-backend-is7sknmvh-krams-projects-066bc402.vercel.app/api/user/login",
        {
          email,
          password,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsAdmin(true);
          navigate("/dashboard");
        } else {
          console.log(res);
          throw res.data.message;
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* Use Box to center the content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh", // Adjust the height as needed
        }}
      >
        <Paper elevation={6} sx={{ padding: 3 }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            style={{ width: "100%", marginTop: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
