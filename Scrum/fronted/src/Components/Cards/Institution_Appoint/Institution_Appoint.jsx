import React from "react";
import "../Institution_List/Institution_List.css";
import "./Institution_Appoint.css";
import ImageDefault from "@assets/default_institution.jpeg";

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
              className="appointment-item"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <p>Trámite: {appointment.procedure_name}</p>
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
        <img
          src={imagen_inst || ImageDefault}
          alt={`Imagen de ${name}`}
          onError={(e) => {
            e.target.src = ImageDefault;
          }}
        />
      </div>
    </div>
  );
}

export default Institution_Appoint;
