import styles from "./Checkbox.module.css";
import { useState } from "react";

const Checkbox = ({ name, id, onChange }) => {
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
    </div>
  );
};

export default Checkbox;
