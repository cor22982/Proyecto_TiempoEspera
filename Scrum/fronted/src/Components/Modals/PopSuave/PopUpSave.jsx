import PopUp from "@components/Modals/MessagePopUp/MessagePopUp";
import styles from "./PopUpSave.module.css"; // Importa las clases CSS Modules

function PopUpSave({
  activar,
  setActivar,
  nombre,
  description,
  image,
  address,
}) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div className={styles.popupContainer}>
        <h2 className={styles.title}>{nombre}</h2>
        <img className={styles.image} src={image} alt="Imagen" />
        <p className={styles.description}>{description}</p>
        <p className={styles.address}>{address}</p>
      </div>
    </PopUp>
  );
}

export default PopUpSave;
