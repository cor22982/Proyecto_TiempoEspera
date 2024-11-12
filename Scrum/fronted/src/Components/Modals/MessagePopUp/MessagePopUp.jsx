import React from "react";
import styles from "./MessagePopUp.module.css"; // Importar el módulo CSS

const PopUp = (props) => {
  return props.trigger ? (
    <div className={styles.popup}>
      <div className={styles["popup-inner"]}>
        <button
          className={styles["closed-button"]}
          onClick={() => props.setTrigger(false)}
        >
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopUp;
