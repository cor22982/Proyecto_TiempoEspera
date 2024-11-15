import React from "react";
import "../Institution_List/Institution_List.css";
import "./Institution_Appoint.css";
function Institution_Appoint({ name, imagen_inst, list_appointments }) {
  return (
    <div className="display-items-apoint">
      <div className="info">
        <h3>{name}</h3>
        <br></br>
        <h5>Reservaciones</h5>
        <br></br>
        <div className="reservaciones">
          {list_appointments.map((appointment, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
            >
              <p>Tramite: {appointment.procedure_name}</p>
              <p>Hora: {appointment.appointment_time.substring(0, 5)}</p>
              <p>
                Fecha:{" "}
                {new Date(appointment.appointment_date).toLocaleDateString(
                  "es-ES"
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="image-container">
        <img src={imagen_inst} alt={imagen_inst} />
      </div>
    </div>
  );
}

export default Institution_Appoint;
