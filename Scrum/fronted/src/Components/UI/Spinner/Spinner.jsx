import React from 'react'
import './Spinner.css'
import {CircularProgress } from "@mui/material";
function Spinner() {
  return (
    <div className="loading-spinner">
      <CircularProgress></CircularProgress>
    </div>
  )
} 

export default Spinner