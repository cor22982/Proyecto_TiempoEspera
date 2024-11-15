import React from "react";
import styles from "./Image.module.css";
import ImageDefault from "@assets/default_banner_institution.jpg";

const ImageComponent = ({ src, alt, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.imageContainer} onClick={handleClick}>
      <img src={src || ImageDefault} alt={alt} className={styles.image} />
    </div>
  );
};

export default ImageComponent;
