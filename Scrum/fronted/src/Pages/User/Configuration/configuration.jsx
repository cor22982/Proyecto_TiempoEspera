import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import LockIcon from "@mui/icons-material/Lock";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./configuration.module.css";
import { ThemeContext } from "@contexts/ConfigContext/ThemeContext";
import { FontContext } from "@contexts/ConfigContext/FontContext";
import { FontSizeContext } from "@contexts/ConfigContext/FontSizeContext";
import Swal from "sweetalert2";
import { red } from "@mui/material/colors";
import CustomTextField from "@components/Inputs/TextFieldUI/TextFieldUI";

// Obtén el valor de las variables CSS usando JavaScript
const rootStyle = getComputedStyle(document.documentElement);

const switchColor = rootStyle.getPropertyValue("--cg-switch-color").trim();
const switchHoverBg = rootStyle.getPropertyValue("--cg-switch-hover-bg").trim();
const switchOffColor = rootStyle
  .getPropertyValue("--cg-switch-off-color")
  .trim();
const switchTrackOff = rootStyle
  .getPropertyValue("--cg-switch-track-off")
  .trim();
const switchFocusShadow = rootStyle
  .getPropertyValue("--cg-switch-focus-shadow")
  .trim();

// Custom Switch usando las variables CSS
const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: switchColor, // Color del punto cuando está activado
    "&:hover": {
      backgroundColor: switchHoverBg, // Fondo del punto en hover
    },
  },
  "& .MuiSwitch-switchBase": {
    color: switchOffColor, // Color del punto cuando está desactivado
  },
  "& .MuiSwitch-track": {
    backgroundColor: switchTrackOff, // Color de la pista cuando está desactivada
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: switchColor, // Color de la pista cuando está activada
  },
  "& .MuiSwitch-switchBase:focus": {
    boxShadow: `0 0 0 3px ${switchFocusShadow}`, // Sombra cuando está enfocado
  },
}));

// Obtén el valor de las variables CSS usando JavaScript
const sliderPointColor = rootStyle
  .getPropertyValue("--cg-slider-point-color")
  .trim();
const sliderPointHover = rootStyle
  .getPropertyValue("--cg-slider-point-hover")
  .trim();
const sliderRailActiveBg = rootStyle
  .getPropertyValue("--cg-slider-raid-active-bg")
  .trim();

const sliderRailActiveMargin = rootStyle
  .getPropertyValue("--cg-slider-raid-active-margin")
  .trim();

const sliderRailInactive = rootStyle
  .getPropertyValue("--cg-slider-rail-inactive")
  .trim();

const sliderPointFocus = rootStyle
  .getPropertyValue("--cg-slider-point-focus")
  .trim();

// Custom Slider usando las variables CSS
const CustomSlider = styled(Slider)({
  color: sliderRailActiveMargin, // Color del punto y de la pista del Slider
  "& .MuiSlider-thumb": {
    backgroundColor: sliderPointColor, // Color del punto del Slider
    "&:hover, &.Mui-focusVisible, &.Mui-active": {
      boxShadow: `0px 0px 0px 8px ${sliderPointHover}`, // Sombra en hover y cuando está activo
    },
    "&:focus, &.Mui-active": {
      boxShadow: `0px 0px 0px 8px ${sliderPointFocus}`, // Sombra más oscura cuando está enfocado o activo
    },
  },
  "& .MuiSlider-track": {
    backgroundColor: sliderRailActiveBg, // Color de la pista del Slider
  },
  "& .MuiSlider-rail": {
    opacity: 0.8,
    backgroundColor: sliderRailInactive, // Color de la pista de fondo
  },
});

const radioColor = rootStyle.getPropertyValue("--radio-color").trim();
const radioHoverColor = rootStyle
  .getPropertyValue("--radio-hover-color")
  .trim();
const radioOffColor = rootStyle.getPropertyValue("--radio-off-color").trim();

const CustomRadio = styled(Radio)(({ theme }) => ({
  color: radioOffColor, // Color del punto cuando no está seleccionado
  "&.Mui-checked": {
    color: radioColor, // Color del punto cuando está seleccionado
  },
  "&:hover": {
    backgroundColor: alpha(radioHoverColor, 0.2), // Fondo en hover (usando alpha para transparencia)
  },
}));

const CustomTypography = styled(Typography)({
  fontSize: "inherit !important", // Aplica !important
  fontFamily: "inherit !important",
  color: "var(--text-secondary) !important", // Aplica !important
});

const Configuration = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { fontFamily, changeFontFamily } = useContext(FontContext);
  const { fontSize, changeFontSize } = useContext(FontSizeContext);
  const [password, setPassword] = useState("");

  const [tempIsDarkMode, setTempIsDarkMode] = useState(isDarkMode);
  const [tempFontFamily, setTempFontFamily] = useState(fontFamily);
  const [tempFontSize, setTempFontSize] = useState(fontSize);

  const handleTempToggleDarkMode = () => {
    setTempIsDarkMode((prev) => !prev);
  };

  const handleTempFontSizeChange = (event, newValue) => {
    setTempFontSize(newValue);
  };

  const handleTempFontFamilyChange = (event) => {
    setTempFontFamily(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSaveChanges = () => {
    let changesMade = false;

    if (tempIsDarkMode !== isDarkMode) {
      toggleDarkMode();
      changesMade = true;
    }

    if (tempFontFamily !== fontFamily) {
      changeFontFamily(tempFontFamily);
      changesMade = true;
    }

    if (tempFontSize !== fontSize) {
      changeFontSize(tempFontSize);
      changesMade = true;
    }

    if (changesMade) {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Los cambios se han guardado correctamente.",
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "No se realizaron cambios para guardar.",
      });
    }
  };

  useEffect(() => {
    document.body.style.fontFamily = tempFontFamily;
    document.body.style.fontSize = `${tempFontSize}px`;
    document.body.classList.toggle("darkMode", tempIsDarkMode);

    return () => {
      document.body.style.fontFamily =
        localStorage.getItem("fontFamily") || "Inika";
      document.body.style.fontSize = `${
        localStorage.getItem("fontSize") || 16
      }px`;
      document.body.classList.toggle("darkMode", isDarkMode);
    };
  }, [tempFontFamily, tempFontSize, tempIsDarkMode, isDarkMode]);

  return (
    <Container className={styles.container}>
      <Paper elevation={3} className={styles.configCard}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <div className={styles.sectionHeader}>
              <LockIcon className={styles.icon} />
              <Typography className={styles.subtitle} variant="h6">
                Cambiar la Contraseña
              </Typography>
            </div>

            <CustomTextField
              type="password"
              label="Nueva Contraseña"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              placeholder="Ingresa tu nueva contraseña"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={styles.sectionHeader}>
              <SettingsIcon className={styles.icon} />
              <Typography className={styles.subtitle} variant="h6">
                Tema (Modo Oscuro/Claro)
              </Typography>
            </div>
            <FormControlLabel
              control={
                <CustomSwitch
                  checked={tempIsDarkMode}
                  onChange={handleTempToggleDarkMode}
                />
              }
              label={
                <Typography
                  sx={{
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    color: "var(--text-secondary) !important",
                  }}
                  component="span"
                >
                  Modo Oscuro
                </Typography>
              }
            />
          </Grid>

          <Grid item xs={12}>
            <div className={styles.sectionHeader}>
              <AccessibilityNewIcon className={styles.icon} />
              <Typography className={styles.subtitle} variant="h6">
                Accesibilidad
              </Typography>
            </div>

            <CustomTypography variant="subtitle1">
              Ajuste de Tamaño de Fuente
            </CustomTypography>
            <CustomSlider
              value={tempFontSize}
              min={12}
              max={24}
              step={1}
              onChange={handleTempFontSizeChange}
              valueLabelDisplay="auto"
              aria-labelledby="font-size-slider"
            />
            <CustomTypography variant="subtitle1">
              Tipografía Preferida
            </CustomTypography>

            <FormControl component="fieldset">
              <RadioGroup
                value={tempFontFamily}
                onChange={handleTempFontFamilyChange}
              >
                <FormControlLabel
                  value="Inika"
                  control={<CustomRadio />}
                  label={
                    <Typography
                      style={{
                        fontFamily: "var(--title-inika)",
                        fontSize: "inherit",
                        color: "var(--text-secondary) !important",
                      }}
                    >
                      Inika
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Roboto"
                  control={<CustomRadio />}
                  label={
                    <Typography
                      style={{
                        fontFamily: "var(--font-roboto)",
                        fontSize: "inherit",
                        color: "var(--text-secondary) !important",
                      }}
                    >
                      Roboto
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Times New Roman"
                  control={<CustomRadio />}
                  label={
                    <Typography
                      style={{
                        fontFamily: "var(--font-times)",
                        fontSize: "inherit",
                        color: "var(--text-secondary) !important",
                      }}
                    >
                      Times New Roman
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          className={styles.saveButton}
          variant="contained"
          onClick={handleSaveChanges}
          sx={{ fontSize: "inherit" }}
        >
          Guardar Cambios
        </Button>
      </Paper>
    </Container>
  );
};

export default Configuration;
