import styles from "./Checkbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Checkbox = ({ name, id, onChange, type, onsearch, active, onPress }) => {
  const [pressed, setPressed] = useState(active || false); // Estado inicial según `active`

  const handleClick = () => {
    setPressed(!pressed);
    if (typeof onChange === "function") {
      onChange(id); // Solo ejecuta si es una función
      onPress(name);
    } else {
      console.error("onChange no es una función válida");
    }
  };

  return (
    <div className={styles["checkbox-container"]}>
      <button
        className={
          pressed ? styles["button-checkbox-click"] : styles["button-checkbox"]
        }
        onClick={handleClick}
      ></button>
      <p className={styles["titulo-checkbox"]}>{name}</p>

      {/* Mostrar el icono solo si 'type' existe */}
      {type && (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            onsearch(name);
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </div>
      )}
    </div>
  );
};

export default Checkbox;
