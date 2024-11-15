import styles from "./Checkbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Checkbox = ({ name, id, onChange, type, onsearch, active, onPress }) => {
  const [pressed, setPressed] = useState(active || false);

  // Sincroniza el estado local `pressed` con el valor de `active`
  useEffect(() => {
    setPressed(active || false);
  }, [active]);

  const handleClick = () => {
    const newPressedState = !pressed;
    setPressed(newPressedState);

    // Llama a onChange si es una función válida
    if (typeof onChange === "function") {
      onChange(id); 
    } else {
      console.error("onChange no es una función válida");
    }

    // Llama a onPress si es una función válida
    if (typeof onPress === "function") {
      onPress(name);
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
            if (typeof onsearch === "function") {
              onsearch(name);
            } else {
              console.error("onsearch no es una función válida");
            }
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </div>
      )}
    </div>
  );
};

export default Checkbox;
