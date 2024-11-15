import styles from "./Checkbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Checkbox = ({ name, id, onChange, type, onsearch }) => {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(!pressed);
    onChange(id); // Pass the institution ID to the onChange function
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
        <div style={{cursor: 'pointer'}} onClick={() => {onsearch(name)}}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      )}
    </div>
  );
};

export default Checkbox;
