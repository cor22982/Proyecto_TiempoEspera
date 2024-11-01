import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Spinner.css'
function Spinner() {
  return (
    <div className="loading-spinner">
      <FontAwesomeIcon icon={faSpinner} className="spinner" />
    </div>
  )
}

export default Spinner