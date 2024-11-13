import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./components/AuthContext"; // Asegúrate de tener la ruta correcta al contexto

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Obtén el usuario y el estado de carga desde el contexto

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un mensaje mientras Firebase verifica el estado de autenticación
  }

  if (!user) {
    return <Navigate to="/" />; // Redirige a la página de inicio si el usuario no está autenticado
  }

  return children; // Si el usuario está autenticado, renderiza el contenido de la ruta protegida
};

export default ProtectedRoute;
