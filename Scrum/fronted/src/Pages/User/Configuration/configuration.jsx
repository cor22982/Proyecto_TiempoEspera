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

const Configuration = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { fontFamily, changeFontFamily } = useContext(FontContext);
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const [password, setPassword] = useState('');

  const handleFontSizeChange = (event, newValue) => {
    setFontSize(newValue);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFontFamilyChange = (event) => {
    const newFont = event.target.value;
    console.log(`Familia de fuentes cambiada a: ${newFont}`);
    changeFontFamily(newFont);
  };

  // Efecto para actualizar el font-family del cuerpo
  useEffect(() => {
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily]);

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
            <TextField
              type="password"
              label="Nueva Contraseña"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
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
              control={<Switch checked={isDarkMode} onChange={toggleDarkMode} color="primary" />}
              label="Modo Oscuro"
              className={styles.control}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={styles.sectionHeader}>
              <AccessibilityNewIcon className={styles.icon} />
              <Typography className={styles.subtitle} variant="h6">
                Accesibilidad
              </Typography>
            </div>
            <Typography variant="subtitle1" sx={{ fontSize: '1.15rem' }}>
              Ajuste de Tamaño de Fuente
            </Typography>

            <Slider
            value={fontSize}
            min={12}
            max={24}
            step={1}
            onChange={handleFontSizeChange}
            valueLabelDisplay="auto"
            aria-labelledby="font-size-slider"
            color="secondary"
            />

            <Typography variant="subtitle1" sx={{ fontSize: '1.15rem' }}>
              Tipografía Preferida
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup value={fontFamily} onChange={handleFontFamilyChange}>
                <FormControlLabel value="Inika" control={<Radio color="primary" />} label="Inika" />
                <FormControlLabel value="Roboto" control={<Radio color="primary" />} label="Roboto" />
                <FormControlLabel value="Times New Roman" control={<Radio color="primary" />} label="Times New Roman" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          className={styles.saveButton}
          variant="contained"
          sx={{
            backgroundColor: '#00367E',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#002254',
            },
          }}
        >
          Guardar Cambios
        </Button>
      </Paper>
    </Container>
  );
};

export default Configuration;
