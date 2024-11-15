import React from "react";
import ImageDefault from "@assets/default_institution.jpeg"; // Ruta de la imagen por defecto

function Institutions_List2({ institutions_items }) {
  return (
    <div className="list-institutions">
      {institutions_items.map((institution) => (
        <div key={institution.id_institutions} className="component-list">
          <div className="info">
            <h4>{institution.name}</h4>
            <h6>
              Telefono{" "}
              {institution.telefono ? institution.telefono : "No disponible"}
            </h6>
          </div>
          <div className="image-container">
            <img
              src={institution.imagen || ImageDefault} // Usa la imagen por defecto si `imagen` es null
              alt={institution.name}
              onError={(e) => {
                e.target.src = ImageDefault; // Cambia a la imagen por defecto en caso de error
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Institutions_List2;
