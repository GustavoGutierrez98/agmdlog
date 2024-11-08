// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AppointmentForm from "./components/AppointmentForm";
import CitasCalendario from "./components/CalendarComponent";

function App() {
  return (
    <Router>
      {" "}
      {/* Asegúrate de envolver toda la aplicación con Router */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AppointmentForm />} />

        <Route path="/calendar" element={<CitasCalendario />} />
      </Routes>
    </Router>
  );
}

export default App;
