// TextArea.js
import { useState } from "react";
import styles from "./TextArea.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const TextArea = ({ placeholder, onChange, value, onClick }) => {
  const [change, setChange] = useState(true);
  const [textareaValue, setTextareaValue] = useState(value || "");
  const [isWriting, setIsWriting] = useState(false);
  const [image, setImage] = useState(null); // Estado para la imagen adjunta

  const onCancel = () => {
    setChange(true);
    setIsWriting(false);
    setImage(null); // Resetear la imagen adjunta
  };

  const onPush = () => {
    setChange(false);
  };

  const handleSend = () => {
    onClick(textareaValue, image); // Enviar el mensaje y la imagen
    setTextareaValue("");
    setImage(null); // Resetear la imagen después de enviar
    setIsWriting(false);
  };

  const handleTextChange = (value) => {
    setTextareaValue(value);
    onChange(value);
    setIsWriting(value.length > 0);
  };

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile)); // Crear una URL para mostrar la imagen como vista previa
    }
  };

  return (
    <div className={styles.textareaContenedor}>
      {change ? (
        <div className={styles.inputToText} onClick={onPush}>
          {placeholder}
        </div>
      ) : (
        <div className={styles.textAreaContainer}>
          {/* Vista previa de la imagen a la izquierda del textarea */}
          {image && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={image}
                alt="Vista previa"
                className={styles.imagePreview}
              />
              <FontAwesomeIcon
                icon={faTimesCircle}
                className={styles.removeImageButton}
                onClick={() => setImage(null)}
              />
            </div>
          )}
          <textarea
            className={`${styles.textArea} ${
              isWriting ? styles.inputActive : ""
            }`}
            onChange={({ target: { value } }) => handleTextChange(value)}
            value={textareaValue}
            placeholder={placeholder}
          />
          <div className={styles.botonesTextarea}>
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <label htmlFor="imageUpload" className={styles.imageUploadLabel}>
              <FontAwesomeIcon icon={faPaperclip} /> {/* Icono de clip */}
            </label>
            <button className={styles.buttonTextareaCancel} onClick={onCancel}>
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
