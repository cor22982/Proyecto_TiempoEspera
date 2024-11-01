import styles from "./Checkbox.module.css";
import { useState } from "react";

const Checkbox = ({ name }) => {
  const [pressed, setPressed] = useState(false);
  const handleClick = () => {
    setPressed(!pressed);
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
