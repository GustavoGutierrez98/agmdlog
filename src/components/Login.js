import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography"; // Para el título
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if both fields are filled
    if (!email || !password) {
      toast.warn("Por favor, llena todos los campos.", {
        position: "top-right", // You can adjust the position
        autoClose: 3000, // Time in milliseconds before the toast disappears
        hideProgressBar: true,
      });
      return; // Prevent form submission if fields are empty
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Inicio de sesión exitoso!"); // Success toast
      navigate("/register");
    } catch (err) {
      toast.error("Error al iniciar sesión: " + err.message); // Error toast
      setError(err.message); // Optionally, set error message to display below the form
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6", // Color de fondo suave
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
          LOGIN
        </Typography>
        <form onSubmit={handleLogin}>
          <Stack spacing={3}>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Contraseña"
              variant="outlined"
              fullWidth
              required
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "#d332bf", // Change background color
                color: "white", // Change text color
                fontSize: "16px", // Set font size
                fontWeight: "bold", // Make text bold
                fontFamily: "'Roboto', sans-serif", // Set font family
                textTransform: "none", // Prevent text from being uppercase
                letterSpacing: "1px", // Add some letter spacing
                "&:hover": {
                  backgroundColor: "#8E4585", // Change hover background color
                },
              }}
            >
              Iniciar Sesión
            </Button>
          </Stack>
        </form>
        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}
      </Box>
      <ToastContainer /> {/* This will render the toast notifications */}
    </Box>
  );
}

export default Login;
