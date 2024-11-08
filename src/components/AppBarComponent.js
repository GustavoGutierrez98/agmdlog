// src/Components/AppBarComponent.js
import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "./firebaseConfig"; // Importa signOut desde firebaseConfig

function AppBarComponent() {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirige al login o página de inicio
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gestión de Citas
        </Typography>
        <Button color="inherit" onClick={() => navigate("/register")}>
          Registrar Cita
        </Button>
        <Button color="inherit" onClick={() => navigate("/calendar")}>
          Calendario
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
