import { useState } from "react";
import styles from "./TextArea.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import ImageModal from "@components/Modals/ImageModal/ImageModal";

const TextArea = ({ placeholder, onChange, value, onClick }) => {
  const [change, setChange] = useState(true);
  const [textareaValue, setTextareaValue] = useState(value || "");
  const [isWriting, setIsWriting] = useState(false);
  const [image, setImage] = useState(null); // Estado para la imagen adjunta
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

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

  const openModal = () => {
    setShowModal(true); // Mostrar el modal
  };

  const closeModal = () => {
    setShowModal(false); // Cerrar el modal
  };

  return (
    <div className={styles.textareaContenedor}>
      {change ? (
        <div className={styles.inputToText} onClick={onPush}>
          {placeholder}
        </div>
      ) : (
        <div className={styles.textAreaContainer}>
          {/* Vista previa de la imagen y abre el modal al hacer clic */}
          {image && (
            <div className={styles.imagePreviewContainer} onClick={openModal}>
              <img
                src={image}
                alt="Vista previa"
                className={styles.imagePreview}
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
            <div className={styles.botonesFila}>
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <label htmlFor="imageUpload" className={styles.imageUploadLabel}>
                <FontAwesomeIcon icon={faPaperclip} className={styles.icon} />
              </label>
              <button
                className={styles.buttonTextareaCancel}
                onClick={onCancel}
              >
                Cancelar
              </button>
              <button className={styles.buttonTextarea} onClick={handleSend}>
                Enviar
              </button>
            </div>
            {image && (
              <button
                className={styles.discardImageButton}
                onClick={() => setImage(null)}
              >
                Descartar imagen
              </button>
            )}
          </div>
          {/* Modal para mostrar la imagen en tamaño grande */}
          {showModal && <ImageModal imageSrc={image} onClose={closeModal} />}
        </div>
      )}
    </div>
  );
};

export default TextArea;
