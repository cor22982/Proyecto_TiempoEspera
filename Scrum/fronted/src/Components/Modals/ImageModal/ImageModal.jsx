import React from "react";
import styles from "./ImageModal.module.css";

const ImageModal = ({ imageSrc, onClose }) => {
  if (!imageSrc) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Vista previa" className={styles.modalImage} />
        <button className={styles.closeButton} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
