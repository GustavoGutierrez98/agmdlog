// src/Login.js
import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // Importamos el hook useNavigate

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegación

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Inicio de sesión exitoso!");
      navigate("/register"); // Redirige a la pantalla de registro de citas
    } catch (err) {
      setError("Error al iniciar sesión: " + err.message);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <Box sx={{ width: 300, margin: "0 auto" }}>
          {" "}
          {/* Ajusté el ancho y agregué margin */}
          <Stack spacing={2} direction="column">
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
            <Button variant="contained" type="submit" fullWidth>
              Iniciar Sesión
            </Button>
          </Stack>
        </Box>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mensaje de error más visible */}
    </div>
  );
}

export default Login;
