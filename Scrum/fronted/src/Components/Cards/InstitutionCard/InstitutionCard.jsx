import PropTypes from "prop-types";
import styles from "./InstitutionCard.module.css";
import DefaultImage from "@assets/default_institution.jpeg";

const InsttutionComponent = ({
  name,
  image,
  onClick,
  tiempo,
  procedimiento,
}) => {
  const displayedImage = image || DefaultImage; // Usa la imagen predeterminada si image es null o vacío

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.imagenContainer}>
        <img
          src={displayedImage}
          alt="institution"
          className={styles.institutionImage}
          onError={(e) => {
            e.target.src = DefaultImage;
          }}
        />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.procedimientoName}>{procedimiento}</div>
        <h1 className={styles.heading1}>{name}</h1>
        <br />
        <h2 className={styles.heading}>Tiempo Promedio</h2>
        <h3 className={styles.timelapmse}>{tiempo}</h3>
      </div>
    </div>
  );
};

InsttutionComponent.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  tiempo: PropTypes.string.isRequired,
  procedimiento: PropTypes.string,
};

export default InsttutionComponent;
