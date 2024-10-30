import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "./LogOut.module.css";

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }, []);

  return (
    <div className={styles.salir}>
      <FontAwesomeIcon icon={faSpinner} className={styles.iconLogout} />
      <h1 className={styles.tituloSaliendo}>Saliendo</h1>
    </div>
  );
};

export default Logout;
