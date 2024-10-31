import styles from "./SavedProcedureCard.module.css";

const SavedComponent = ({ image, title, description, funtion }) => {
  return (
    <div className={styles.containerSaved} onClick={funtion}>
      <img src={image} className={styles.imagenInstitution} alt="Institution" />
      <div className={styles.savedInformation}>
        <h2 className={styles.tituloInformation}>{title}</h2>
        <p className={styles.descriptionInformation}>{description}</p>
      </div>
    </div>
  );
};

export default SavedComponent;
