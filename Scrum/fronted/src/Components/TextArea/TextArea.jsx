import { useState } from 'react'
import './TextArea.css'
const TextArea = ({placeholder, onChange, value }) => {
  const [change, setChange] = useState(true)

  const oncancel = () => {
    setChange(true)
  }
 
  const onpush = () => {
    setChange(false)
  }
  return(
  <div className="textarea-contenedor">
    { change ? (
        <div 
          className='input-to-text'
          onClick={onpush}>{placeholder}</div>
      ) :
      (
        <div>
        <textarea 
          className='text-area'
          onChange={({ target: { value }}) => onChange(value)}
          value={value}></textarea>
        <div className='botones-textarea'>
        <button 
          className='button-textarea1'
          onClick={oncancel}>Cancelar</button>
        <button className='button-textarea'>Enviar</button>
        </div> 
      </div>
      )
    }

    
  </div>
  )
}

export default TextArea