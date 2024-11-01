import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import styles from "./TextFieldUI.module.css";

const getColors = (isDarkMode) => {
  // Colores para el modo claro y oscuro
  return isDarkMode
    ? {
        borderColor: "#707070",
        hoverBorderColor: "#4A90E2",
        focusBorderColor: "#66A3FF",
        placeholderColor: "#B0C4DE",
        textColor: "#A3D1FF",
        backgroundColor: "#454545",
      }
    : {
        borderColor: "#cccccc",
        hoverBorderColor: "#004A9E",
        focusBorderColor: "#00367E",
        placeholderColor: "#005a96",
        textColor: "#024069",
        backgroundColor: "#ffffff",
      };
};

// Define un TextField personalizado
const CustomTextField = styled(TextField)(({ theme }) => {
  const isDarkMode = document.body.classList.contains("darkMode");
  const {
    borderColor,
    hoverBorderColor,
    focusBorderColor,
    placeholderColor,
    textColor,
    backgroundColor,
  } = getColors(isDarkMode);

  return {
    "& .MuiOutlinedInput-root": {
      backgroundColor: backgroundColor,
      "& fieldset": {
        borderColor: borderColor,
      },
      "&:hover fieldset": {
        borderColor: hoverBorderColor,
      },
      "&.Mui-focused fieldset": {
        borderColor: focusBorderColor,
      },
      color: textColor,
    },
    "& .MuiInputBase-input": {
      color: textColor,
    },
    "& .MuiInputLabel-root": {
      color: textColor,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: focusBorderColor,
    },
    "& .MuiInputBase-input::placeholder": {
      color: placeholderColor,
      opacity: 1,
    },
  };
});

const CustomTextFieldComponent = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  const [inputType, setInputType] = useState(type);
  const [isDarkMode, setIsDarkMode] = useState(
    document.body.classList.contains("darkMode")
  );

  useEffect(() => {
    // Crea un observer para detectar cambios en las clases de body
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains("darkMode"));
    });

    // Observa los cambios en las clases de body
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Limpia el observer cuando el componente se desmonta
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleFocus = () => {
    if (type === "date") setInputType("date");
    else if (type === "time") setInputType("time");
  };

  return (
    <CustomTextField
      className={styles.inputMaterial}
      type={inputType}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={handleFocus}
      variant="outlined"
      fullWidth
      InputProps={{
        style: { fontFamily: "inherit", fontSize: "inherit" },
      }}
      InputLabelProps={{
        style: { fontFamily: "inherit", fontSize: "inherit" },
      }}
    />
  );
};

CustomTextFieldComponent.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomTextFieldComponent;
