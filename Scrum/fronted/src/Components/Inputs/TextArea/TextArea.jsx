import { useState } from 'react';
import './TextArea.css';

const TextArea = ({ placeholder, onChange, value, onclick }) => {
  const [change, setChange] = useState(true);
  const [textareaValue, setTextareaValue] = useState(value || ''); // Estado para el valor del textarea

  const oncancel = () => {
    setChange(true);
  };

  const onpush = () => {
    setChange(false);
  };

  const handleSend = () => {
    onclick(); // Ejecuta la función pasada por props
    setTextareaValue(''); // Resetea el textarea
  };

  return (
    <div className="textarea-contenedor">
      {change ? (
        <div className="input-to-text" onClick={onpush}>
          {placeholder}
        </div>
      ) : (
        <div>
          <textarea
            className="text-area"
            onChange={({ target: { value } }) => {
              setTextareaValue(value); // Actualiza el valor del textarea
              onChange(value); // Ejecuta la función onChange pasada por props
            }}
            value={textareaValue}
          />
          <div className="botones-textarea">
            <button className="button-textarea1" onClick={oncancel}>
              Cancelar
            </button>
            <button className="button-textarea" onClick={handleSend}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextArea;

