import React from 'react'
import './InputHolder.css'
function InputHolder({onChange,value}) {
  return (
    <input
      onChange={({ target: { value }}) => onChange(value)}
      value={value}
      className='input-holder'/>
      
  )
}

export default InputHolder