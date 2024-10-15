import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Typography,
  Switch,
  Slider,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Paper,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './configuration.module.css';
import { ThemeContext } from '@contexts/ConfigContext/ThemeContext';
import { FontContext } from '@contexts/ConfigContext/FontContext';
import { FontSizeContext } from '@contexts/ConfigContext/FontSizeContext';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const Configuration = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { fontFamily, changeFontFamily } = useContext(FontContext);
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const [password, setPassword] = useState('');

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
      setFontSize(tempFontSize);
      changesMade = true;
    }

    if (changesMade) {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Los cambios se han guardado correctamente.',
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No se realizaron cambios para guardar.',
      });
    }
  };

  useEffect(() => {
    document.body.style.fontFamily = tempFontFamily;
    document.body.style.fontSize = `${tempFontSize}px`;

    if (tempIsDarkMode) {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }

    return () => {
      document.body.style.fontFamily = localStorage.getItem('fontFamily') || 'Inika';
      document.body.style.fontSize = `${localStorage.getItem('fontSize') || 16}px`;
      const savedTheme = localStorage.getItem('isDarkMode') === 'true';
      if (savedTheme) {
        document.body.classList.add('darkMode');
      } else {
        document.body.classList.remove('darkMode');
      }
    };
  }, [tempFontFamily, tempFontSize, tempIsDarkMode]);

  return (
    <Container className={styles.container}>
      <Paper elevation={3} className={styles.configCard}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <div className={styles.sectionHeader}>
              <LockIcon className={styles.icon} />
              <Typography className={styles.subtitle} variant="h6" sx={{ fontSize: 'inherit' }}>
                Cambiar la Contraseña
              </Typography>
            </div>
            <TextField
              className={styles.InputMaterial}
              type="password"
              label="Nueva Contraseña"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              InputProps={{
                style: { fontFamily: 'inherit', fontSize: 'inherit' }, // Inherit font size
              }}
              InputLabelProps={{
                style: { fontFamily: 'inherit', fontSize: 'inherit' }, // Inherit label font size
              }}
              placeholder="Ingresa tu nueva contraseña"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={styles.sectionHeader}>
              <SettingsIcon className={styles.icon} />
              <Typography className={styles.subtitle} variant="h6" sx={{ fontSize: 'inherit' }}>
                Tema (Modo Oscuro/Claro)
              </Typography>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={tempIsDarkMode}
                  onChange={handleTempToggleDarkMode}
                  color="primary"
                />
              }
              label={
                <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }} component="span">
                  Modo Oscuro
                </Typography>
              }
            />
          </Grid>

          <Grid item xs={12}>
            <div className={styles.sectionHeader}>
              <AccessibilityNewIcon className={styles.icon} />
              <Typography className={styles.subtitle} variant="h6" sx={{ fontSize: 'inherit' }}>
                Accesibilidad
              </Typography>
            </div>
            <Typography variant="subtitle1" sx={{ fontSize: 'inherit', fontFamily: 'inherit' }}>
              Ajuste de Tamaño de Fuente
            </Typography>
            <Slider
              value={tempFontSize}
              min={12}
              max={24}
              step={1}
              onChange={handleTempFontSizeChange}
              valueLabelDisplay="auto"
              aria-labelledby="font-size-slider"
              color="secondary"
            />
            <Typography variant="subtitle1" sx={{ fontSize: 'inherit', fontFamily: 'inherit' }}>
              Tipografía Preferida
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup value={tempFontFamily} onChange={handleTempFontFamilyChange}>
                <FormControlLabel
                  value="Inika"
                  control={<Radio color="primary" />}
                  label={
                    <Typography style={{ fontFamily: 'var(--title-inika)', fontSize: 'inherit' }}>
                      Inika
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Roboto"
                  control={<Radio color="primary" />}
                  label={
                    <Typography style={{ fontFamily: 'var(--font-roboto)', fontSize: 'inherit' }}>
                      Roboto
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Times New Roman"
                  control={<Radio color="primary" />}
                  label={
                    <Typography style={{ fontFamily: 'var(--font-times)', fontSize: 'inherit' }}>
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
          sx={{ fontSize: 'inherit' }} // Inherit button font size
        >
          Guardar Cambios
        </Button>
      </Paper>
    </Container>
  );
};

export default Configuration;
