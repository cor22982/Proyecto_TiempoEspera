import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./IconButton.module.css";

function IconButton({ icono, onclick, color, texto }) {
  return (
    <div
      role="button"
      onClick={onclick}
      className={styles["icon_button-container"]}
      style={{ "--ib-color": color }}
    >
      {texto && <span className={styles["icon_text"]}>{texto}</span>}
      <FontAwesomeIcon icon={icono} className={styles["icon_button"]} />
    </div>
  );
}

export default IconButton;
