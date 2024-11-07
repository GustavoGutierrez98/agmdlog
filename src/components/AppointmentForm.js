import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppBarComponent from "./AppBarComponent";

const AppointmentForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patient, setPatient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const appointmentsList = [];
    querySnapshot.forEach((doc) => {
      appointmentsList.push({ id: doc.id, ...doc.data() });
    });
    setAppointments(appointmentsList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time || !patient) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (editingAppointment) {
      handleUpdate(e);
    } else {
      try {
        await addDoc(collection(db, "appointments"), {
          date,
          time,
          patient,
        });
        console.log("Cita guardada");
      } catch (e) {
        console.error("Error al guardar la cita: ", e);
      }
    }

    setDate("");
    setTime("");
    setPatient("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingAppointment) return;

    const appointmentRef = doc(db, "appointments", editingAppointment.id);
    try {
      await updateDoc(appointmentRef, {
        date,
        time,
        patient,
      });
      setEditingAppointment(null);
      fetchAppointments();
    } catch (error) {
      console.error("Error al actualizar la cita: ", error);
    }
  };

  const handleDelete = async (appointmentId) => {
    const appointmentRef = doc(db, "appointments", appointmentId);
    try {
      await deleteDoc(appointmentRef);
      fetchAppointments();
    } catch (error) {
      console.error("Error al eliminar la cita: ", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patient &&
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setDate(appointment.date);
    setTime(appointment.time);
    setPatient(appointment.patient);
  };

  return (
    <Container>
      <AppBarComponent />
      <Paper style={{ padding: "20px", margin: "20px 0" }}>
        <TextField
          fullWidth
          label="Buscar por nombre del paciente"
          value={searchTerm}
          onChange={handleSearch}
          margin="normal"
        />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                type="text"
                label="Nombre del paciente"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            {editingAppointment ? "Actualizar" : "Agregar"}
          </Button>
        </form>
      </Paper>
      {searchTerm && filteredAppointments.length > 0 && (
        <div>
          {filteredAppointments.map((appointment) => (
            <Paper
              key={appointment.id}
              style={{ padding: "10px", margin: "10px 0" }}
            >
              <p>
                <strong>Paciente:</strong> {appointment.patient}
              </p>
              <p>
                <strong>Fecha:</strong> {appointment.date}
              </p>
              <p>
                <strong>Hora:</strong> {appointment.time}
              </p>
              <Button
                onClick={() => handleEdit(appointment)}
                variant="outlined"
                color="primary"
              >
                Editar
              </Button>
              <Button
                onClick={() => handleDelete(appointment.id)}
                variant="outlined"
                color="secondary"
              >
                Eliminar
              </Button>
            </Paper>
          ))}
        </div>
      )}
      {searchTerm && filteredAppointments.length === 0 && (
        <div>
          <p>No hay citas encontradas para el paciente: {searchTerm}</p>
        </div>
      )}
    </Container>
  );
};

export default AppointmentForm;
