import React from "react";
import PropTypes from "prop-types";
import styles from "./Image.module.css";

const ImageComponent = ({ src, alt, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.imageContainer} onClick={handleClick}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};

ImageComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageComponent;
