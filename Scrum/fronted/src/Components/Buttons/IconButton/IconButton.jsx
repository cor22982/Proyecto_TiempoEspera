import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./IconButton.module.css";

function IconButton({ icono, onclick, color, texto }) {
  return (
    <div
      onClick={onclick}
      style={{ display: "flex", gap: "10px" }}
      className={styles["icon_button"]}
    >
      {texto && (
        <span className={styles["icon_text"]} style={{ "--icon-color": color }}>
          {texto}
        </span>
      )}
      <FontAwesomeIcon
        icon={icono}
        className={styles["icon_button"]}
        style={{ "--icon-color": color }}
      />
    </div>
  );
}

export default IconButton;
