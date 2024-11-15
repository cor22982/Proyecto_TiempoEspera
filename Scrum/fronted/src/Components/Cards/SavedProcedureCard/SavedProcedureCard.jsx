import React from "react";
import { debounce } from "lodash";
import styles from "./SavedProcedureCard.module.css";
import ImageDefault from "@assets/default_institution.jpeg";

const SavedComponent = ({ image, title, description, funtion }) => {
  const handleClick = debounce(funtion, 300);

  return (
    <div className={styles.containerSaved} onClick={handleClick} role="button">
      <img
        src={image || ImageDefault}
        className={styles.imagenInstitution}
        alt="Institution"
        onError={(e) => (e.target.src = ImageDefault)}
      />
      <div className={styles.savedInformation}>
        <h2 className={styles.tituloInformation}>{title}</h2>
        <p className={styles.descriptionInformation}>{description}</p>
      </div>
    </div>
  );
};

export default SavedComponent;
