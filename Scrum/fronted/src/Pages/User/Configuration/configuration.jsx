import React, { useState } from 'react';
import {
    Container,
    Typography,
    Switch,
    Slider,
    Button,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Grid,
    Paper,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import styles from './configuration.module.css';

const Configuration = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [contrast, setContrast] = useState(false);
    const [password, setPassword] = useState('');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    const handleFontSizeChange = (event, newValue) => {
        setFontSize(newValue);
    };

    const handleContrastToggle = () => {
        setContrast(!contrast);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFontFamilyChange = (event) => {
        setFontFamily(event.target.value);
    };

    const handleNotificationsToggle = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

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
                            control={<Switch checked={darkMode} onChange={handleDarkModeToggle} color="primary" />}
                            label="Modo Oscuro"
                            className={styles.control}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div className={styles.sectionHeader}>
                            <NotificationsActiveIcon className={styles.icon} />
                            <Typography className={styles.subtitle} variant="h6">
                                Notificaciones
                            </Typography>
                        </div>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={notificationsEnabled}
                                    onChange={handleNotificationsToggle}
                                    color="primary"
                                />
                            }
                            label="Activar Notificaciones"
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
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontSize: '1.15rem',
                            }}
                        >
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

                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontSize: '1.15rem',
                            }}
                        >
                            Tipografía Preferida
                        </Typography>
                        <FormControl component="fieldset">
                            
                            <RadioGroup
                                value={fontFamily}
                                onChange={handleFontFamilyChange}
                            >
                                <FormControlLabel value="Arial" control={<Radio color="primary" />} label="Arial" />
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
                        backgroundColor: '#00367E', // Color de fondo personalizado
                        color: '#fff', // Color del texto
                        '&:hover': {
                            backgroundColor: '#002254', // Color de fondo al hacer hover
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
