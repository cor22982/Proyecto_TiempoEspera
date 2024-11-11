import { useState } from "react";
import ImageModal from "@components/Modals/ImageModal/ImageModal";
import styles from "./Coment.module.css";

const Coment = ({ from, date, coment, imageUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.comentario}>
      <div className={styles.headerComent}>
        <h5 className={styles.headComent}>{from}</h5>
        <p className={styles.dateComent}>
          <em>({date})</em> {/* Fecha en cursiva y entre paréntesis */}
        </p>
      </div>
      <p className={styles.comentContent}>{coment}</p>

      {imageUrl && (
        <div className={styles.imageContainer}>
          <img
            src={`https://deimoss.web05.lol/images/${imageUrl
              .split("/")
              .pop()}`} // Solo el nombre del archivo
            alt="Comentario adjunto"
            className={styles.commentImage}
            onClick={handleImageClick} // Abre el modal al hacer clic en la imagen
          />
        </div>
      )}

      {/* Modal para la vista previa de la imagen */}
      {isModalOpen && (
        <ImageModal
          imageSrc={`https://deimoss.web05.lol/images/${imageUrl
            .split("/")
            .pop()}`}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Coment;
