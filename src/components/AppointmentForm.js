import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBarComponent from "./AppBarComponent";

const AppointmentForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("08:00"); // Hora inicial en punto
  const [patient, setPatient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Ensure proper lifecycle for ToastContainer
  useEffect(() => {
    const toastSuccess = (message) => toast.success(message);
    //const toastError = (message) => toast.error(message);

    // You could set up conditions or actions based on toast notifications
    if (editingAppointment) {
      toastSuccess("Cita actualizada");
    }

    return () => {
      // This cleanup ensures no dangling operations on toast
    };
  }, [appointments, editingAppointment]); // Runs when appointments change

  const fetchAppointments = async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const appointmentsList = [];
    querySnapshot.forEach((doc) => {
      appointmentsList.push({ id: doc.id, ...doc.data() });
    });
    setAppointments(appointmentsList);
  };

  // Función para verificar si existe una cita duplicada
  const isDuplicateAppointment = async (date, time) => {
    const q = query(
      collection(db, "appointments"),
      where("date", "==", date),
      where("time", "==", time)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time || !patient) {
      toast.warn("Todos los campos son obligatorios.");
      return;
    }

    // Verifica si ya existe una cita en la misma fecha y hora
    if (await isDuplicateAppointment(date, time)) {
      toast.warn("Ya existe una cita a esa hora.");
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
        toast.success("Cita guardada");
      } catch (e) {
        toast.error("Error al guardar la cita: ", e);
      }
    }

    setDate("");
    setTime("08:00"); // Reinicia la hora a una hora en punto
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
      toast.error("Error al actualizar la cita: ", error);
    }
  };

  const handleDelete = async (appointmentId) => {
    const appointmentRef = doc(db, "appointments", appointmentId);
    try {
      await deleteDoc(appointmentRef);
      fetchAppointments();
      toast.success("Cita Eliminada");
    } catch (error) {
      toast.error("Error al eliminar la cita: ", error);
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
                inputProps={{
                  step: 3600, // Intervalo de 1 hora en segundos
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#d332bf", // Change background color
              color: "white", // Change text color
              "&:hover": {
                backgroundColor: "#8E4585", // Change hover background color
              },
            }}
          >
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
