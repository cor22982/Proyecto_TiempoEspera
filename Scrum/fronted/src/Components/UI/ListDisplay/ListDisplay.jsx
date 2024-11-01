import React from 'react'
import './ListDisplay.css'
function ListDisplay({ items }) {
  return (
    <div className="list-container">
      {items.map((item, index) => (
        <div key={index} className="list-item">
          {item}
        </div>
      ))}
    </div>
  )
}

export default ListDisplay