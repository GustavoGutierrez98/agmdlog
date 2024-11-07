// CalendarComponent.js
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { db } from "./firebaseConfig"; // Importa la configuración de Firebase
import "react-calendar/dist/Calendar.css";
import { collection, getDocs, query, where } from "firebase/firestore"; // Importa las funciones necesarias para Firestore v9+
import AppBarComponent from "./AppBarComponent";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  // Función para obtener las citas de Firebase
  const fetchAppointments = async (date) => {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    console.log("Fechas de consulta:");
    console.log("startOfDay:", startOfDay);
    console.log("endOfDay:", endOfDay);

    // Crear una consulta de Firestore para obtener las citas entre startOfDay y endOfDay
    const appointmentsRef = collection(db, "appointments");
    const q = query(
      appointmentsRef,
      where("date", ">=", startOfDay),
      where("date", "<=", endOfDay)
    );

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log("No se encontraron citas para esta fecha.");
      }

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Datos de las citas:", data); // Verifica los datos que se recuperan de Firestore
      setAppointments(data);
    } catch (error) {
      console.error("Error al obtener citas:", error);
    }
  };

  // Manejar el cambio de fecha en el calendario
  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAppointments(date);
  };

  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <div>
        <AppBarComponent />
      </div>
      <div>
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <div>
          <h3>Citas para {selectedDate.toDateString()}</h3>
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  {appointment.time} - {appointment.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay citas para este día.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarComponent;
