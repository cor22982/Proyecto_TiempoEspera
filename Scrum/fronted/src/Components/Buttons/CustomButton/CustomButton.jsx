import React from "react";
import PropTypes from "prop-types";
import styles from "./CustomButton.module.css";

const CustomButton = ({ onClick, buttonText }) => {
  return (
    <div className={styles["custom-button-container"]}>
      <button className={styles["custom-button"]} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default CustomButton;
