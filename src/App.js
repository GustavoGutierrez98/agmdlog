import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AppointmentForm from "./components/AppointmentForm";
import CitasCalendario from "./components/CalendarComponent";
import { AuthProvider } from "./components/AuthContext"; // Asegúrate de importar AuthProvider correctamente
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Envolviendo la aplicación con AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <AppointmentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CitasCalendario />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
