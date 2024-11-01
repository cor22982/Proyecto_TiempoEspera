import { useState } from "react";
import styles from "./TextArea.module.css";

const TextArea = ({ placeholder, onChange, value, onclick }) => {
  const [change, setChange] = useState(true);
  const [textareaValue, setTextareaValue] = useState(value || "");
  const [isWriting, setIsWriting] = useState(false); // Nuevo estado para detectar escritura

  const oncancel = () => {
    setChange(true);
    setIsWriting(false); // Reinicia el estado al cancelar
  };

  const onpush = () => {
    setChange(false);
  };

  const handleSend = () => {
    onclick();
    setTextareaValue("");
    setIsWriting(false); // Reinicia el estado al enviar
  };

  const handleTextChange = (value) => {
    setTextareaValue(value);
    onChange(value);
    setIsWriting(value.length > 0); // Activa el estado si hay texto
  };

  return (
    <div className={styles.textareaContenedor}>
      {change ? (
        <div className={styles.inputToText} onClick={onpush}>
          {placeholder}
        </div>
      ) : (
        <div>
          <textarea
            className={`${styles.textArea} ${
              isWriting ? styles.inputActive : ""
            }`}
            onChange={({ target: { value } }) => handleTextChange(value)}
            value={textareaValue}
          />
          <div className={styles.botonesTextarea}>
            <button className={styles.buttonTextareaCancel} onClick={oncancel}>
              Cancelar
            </button>
            <button className={styles.buttonTextarea} onClick={handleSend}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextArea;
