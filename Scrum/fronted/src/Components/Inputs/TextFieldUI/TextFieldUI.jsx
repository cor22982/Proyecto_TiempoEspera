import { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import styles from "./TextFieldUI.module.css";

// Obtén los valores de las variables CSS de tu tema personalizado
const rootStyle = getComputedStyle(document.documentElement);

const borderColor = rootStyle
  .getPropertyValue("--text-field-border-color")
  .trim();
const hoverBorderColor = rootStyle
  .getPropertyValue("--text-field-hover-border-color")
  .trim();
const focusBorderColor = rootStyle
  .getPropertyValue("--text-field-focus-border-color")
  .trim();
const placeholderColor = rootStyle
  .getPropertyValue("--text-field-placeholder-color")
  .trim();
const textColor = rootStyle.getPropertyValue("--text-field-text-color").trim();
const backgroundColor = rootStyle
  .getPropertyValue("--text-field-background-color")
  .trim();

// Define un TextField personalizado
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: backgroundColor, // Color de fondo
    "& fieldset": {
      borderColor: borderColor, // Color del borde
    },
    "&:hover fieldset": {
      borderColor: hoverBorderColor, // Color del borde en hover
    },
    "&.Mui-focused fieldset": {
      borderColor: focusBorderColor, // Color del borde cuando está enfocado
    },
    color: textColor, // Color del texto
  },
  "& .MuiInputBase-input": {
    color: textColor, // Color del texto
  },
  "& .MuiInputLabel-root": {
    color: textColor, // Color del label
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: focusBorderColor, // Color del label cuando está enfocado
  },
  "& .MuiInputBase-input::placeholder": {
    color: placeholderColor, // Color del placeholder
    opacity: 1,
  },
}));

const CustomTextFieldComponent = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  const [inputType, setInputType] = useState(type);
  const [myType] = useState(type);

  const handleFocus = () => {
    if (myType === "date") setInputType("date");
    else if (myType === "time") setInputType("time");
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
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomTextFieldComponent;
