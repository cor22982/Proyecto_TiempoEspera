import React from 'react'

function Institutions_List2({institutions_items}) {
  return (
    <div className="list-institutions">
      {institutions_items.map((institution) => (
        <div key={institution.id_institutions} className="component-list">
          <div className="info">
            <h6>Telefono {institution.telefono ? institution.telefono : 'No disponible'}</h6>
            <h6>Telefono {institution.name}</h6>
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

export default Institutions_List2