import React from 'react'
import './Institution_List.css'


function Institution_List({ institutions_items }) {
  return (
    <div className="list-institutions">
      {institutions_items.map((institution) => (
        <div key={institution.id_institutions} className="component-list">
          <div className="info">
            <h3>{institution.name}</h3>
            <p><strong>Dirección:</strong> {institution.adress}</p>
            <p><strong>Teléfono:</strong> {institution.telefono ? institution.telefono : 'No disponible'}</p>
            <p><strong>Horario:</strong> {institution.hora_apertura && institution.hora_cierre ? `${institution.hora_apertura} - ${institution.hora_cierre}` : 'No disponible'}</p>
            <p><strong>Rating:</strong> {institution.rating}</p>
          </div>
          {institution.imagen && (
            <div className="image-container">
              <img src={institution.imagen} alt={institution.name} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}


export default Institution_List