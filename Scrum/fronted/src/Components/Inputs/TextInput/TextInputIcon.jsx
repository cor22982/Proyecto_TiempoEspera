import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styles from "./TextInputIcon.module.css";

const TextInputIcon = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  icon,
  onIconClick,
  iconOnClick,
}) => {
  const [inputType, setInputType] = useState(type);
  const [mytype] = useState(type);

  const handleIconClick = () => {
    if (onIconClick) {
      setInputType(inputType === "password" ? "text" : "password");
      onIconClick();
    }
  };

  const handleFocus = () => {
    if (mytype === "date") setInputType("date");
    else if (mytype === "time") setInputType("time");
  };

  return (
    <div className={styles.inputIcon}>
      {icon && <FontAwesomeIcon className={styles.iconFont} icon={icon} />}
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
      />
      {onIconClick && (
        <FontAwesomeIcon
          className={styles.iconFontCondition}
          icon={iconOnClick}
          onClick={handleIconClick}
        />
      )}
    </div>
  );
};

TextInputIcon.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  onIconClick: PropTypes.func,
};

export default TextInputIcon;
