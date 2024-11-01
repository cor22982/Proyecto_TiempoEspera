import PropTypes from "prop-types";
import styles from "./InstitutionCard.module.css";

const InsttutionComponent = ({
  name,
  image,
  onClick,
  tiempo,
  procedimiento,
}) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.imagenContainer}>
        <img
          src={image}
          alt="institution"
          className={styles.institutionImage}
          onClick={onClick}
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
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tiempo: PropTypes.string.isRequired,
};

export default InsttutionComponent;
