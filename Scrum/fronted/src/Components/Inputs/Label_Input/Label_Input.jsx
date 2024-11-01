import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import styles from "./Label_Input.module.css";

const Label_Input = ({ label_name, onChange, to_Send, value }) => {
  const [show_input, set_ShowInput] = useState(false);

  const onPush = async () => {
    await to_Send();
    set_ShowInput(false); // Cierra el input después de enviar el dato
  };

  return (
    <div>
      {show_input ? (
        <div className={styles.flexRow}>
          <input
            type="text"
            onChange={({ target: { value } }) => onChange(value)}
            value={value}
          />
          <div className={styles.flexRow}>
            <div
              className={`${styles.checksButtons} ${styles.green}`}
              onClick={async () => {
                await onPush();
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div
              className={`${styles.checksButtons} ${styles.red}`}
              onClick={() => {
                set_ShowInput(false);
              }}
            >
              <FontAwesomeIcon icon={faX} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.flexRow}>
          <p>{label_name}</p>
          <div
            className={styles.styledButtonPen}
            onClick={() => {
              set_ShowInput(true);
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Label_Input;
