import { useState } from "react";
import styles from "./TextMenuLink.module.css";

const TextMenuLink = ({ nombre, onClick }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    if (isProcessing || !onClick) return;

    setIsProcessing(true);

    try {
      await onClick();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles["menu-option"]} onClick={handleClick}>
      <span className={styles["link-menu-option"]}>{nombre}</span>
    </div>
  );
};

export default TextMenuLink;
