import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Import the Spanish locale for moment
import "react-big-calendar/lib/css/react-big-calendar.css";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import AppBarComponent from "./AppBarComponent";

// Use Spanish locale for moment.js
moment.locale("es");

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const localizer = momentLocalizer(moment);

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

  // Convertir citas a eventos para el calendario
  const events = appointments.map((appointment) => {
    const start = moment(`${appointment.date}T${appointment.time}`).toDate();
    const end = moment(start).add(1, "hours").toDate();
    return {
      title: `Paciente: ${appointment.patient} - Hora: ${appointment.time}`,
      start,
      end,
      allDay: false,
    };
  });

  return (
    <Container>
      <AppBarComponent />
      <Paper style={{ padding: "20px", margin: "20px 0" }}>
        <h2>Calendario de Citas</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={(event) => alert(event.title)}
          culture="es" // This ensures the calendar is in Spanish
          messages={{
            allDay: "Todo el día", // "All Day"
            previous: "Anterior", // "Previous"
            next: "Siguiente", // "Next"
            today: "Hoy", // "Today"
            month: "Mes", // "Month"
            week: "Semana", // "Week"
            day: "Día", // "Day"
            agenda: "Agenda", // "Agenda"
            date: "Fecha", // "Date"
            time: "Hora", // "Time"
            event: "Evento", // "Event"
            noEventsInRange: "No hay eventos", // "No events in range"
          }} // These messages update the button labels and other texts
        />
      </Paper>
    </Container>
  );
};

export default AppointmentCalendar;
