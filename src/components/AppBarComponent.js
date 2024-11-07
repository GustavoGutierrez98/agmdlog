// src/Components/AppBarComponent.js
import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AppBarComponent() {
  const navigate = useNavigate();

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
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
