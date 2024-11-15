import React from "react";
import "./Institution_List.css";
import ImageDefault from "@assets/default_institution.jpeg";

const fallbackImageUrl = ImageDefault;

function Institution_List({ institutions_items }) {
  const uniqueInstitutions = institutions_items.filter(
    (institution, index, self) =>
      index ===
      self.findIndex(
        (inst) => inst.id_institutions === institution.id_institutions
      )
  );

  return (
    <div className="list-institutions">
      {uniqueInstitutions.map((institution) => (
        <div key={institution.id_institutions} className="component-list">
          <div className="info">
            <h3>{institution.name}</h3>
            <p>
              <strong>Dirección:</strong> {institution.adress}
            </p>
            <p>
              <strong>Teléfono:</strong> {validatePhone(institution.telefono)}
            </p>
            <p>
              <strong>Horario:</strong>{" "}
              {validateSchedule(
                institution.hora_apertura,
                institution.hora_cierre
              )}
            </p>
            <p>
              <strong>Rating:</strong> {validateRating(institution.rating)}
            </p>
          </div>
          <div className="image-container">
            <img
              src={institution.imagen || fallbackImageUrl}
              alt={institution.name}
              onError={(e) => {
                e.target.src = fallbackImageUrl;
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function validatePhone(phone) {
  const phonePattern = /^[0-9]+$/;
  return phone && phonePattern.test(phone) ? phone : "No disponible";
}

function validateSchedule(opening, closing) {
  const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return opening &&
    closing &&
    timePattern.test(opening) &&
    timePattern.test(closing)
    ? `${opening} - ${closing}`
    : "No disponible";
}

function validateRating(rating) {
  return typeof rating === "number" && rating > 0 ? rating : "No disponible";
}

export default Institution_List;
