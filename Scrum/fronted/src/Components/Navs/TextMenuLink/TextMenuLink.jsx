import styles from "./TextMenuLink.module.css";

const TextMenuLink = ({ nombre, onClick }) => (
  <div className={styles["menu-option"]} onClick={onClick}>
    <span className={styles["link-menu-option"]}>{nombre}</span>
  </div>
);

export default TextMenuLink;
