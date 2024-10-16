import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faStar, faMapLocation } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import './InstitutionInfo.css';
import Imagen from '@components/UI/Image/Image';
import Stats from '@components/UI/AttendanceChart/AttendanceChart';
import MapView from '@components/UI/InteractiveMap/InteractiveMap';
import useApi from '@hooks/api/useApi';
import useToken from '@hooks/auth/useToken';
import PopUpMap from '@components/Modals/PopUpMap/PopUpMap';
import IconButton from '@components/Buttons/IconButton';

const Tramite = ({ institucion }) => {
    const [viewMap, setviewMap] = useState(false);
    const showMap = () => {
        setviewMap(true)
    }
    const calcularEstrellas = () => {
        const puntuacionTotal = 5;
        const puntuacionEntera = Math.floor(institucion.puntuacion);
        const puntuacionDecimal = institucion.puntuacion - puntuacionEntera;

        const estrellasEnteras = Array.from({ length: puntuacionEntera }, (_, index) => (
            <FontAwesomeIcon
                key={`full-${index}`}
                className='icon-star'
                icon={faStar}
            />
        ));

        if (puntuacionDecimal >= 0.5) {
            estrellasEnteras.push(
                <FontAwesomeIcon
                    key={'half'}
                    className='icon-star'
                    icon={faStarHalfAlt}
                />
            );
        }
 
        const estrellasRestantes = Array.from({ length: puntuacionTotal - estrellasEnteras.length }, (_, index) => (
            <i
                key={`empty-${index}`}
                className="far fa-star icon-star"
            ></i>
        ));

        return [...estrellasEnteras, ...estrellasRestantes];
    };
    return (
        <div className='tramite-container'>
            <div className='header'>
                <IconButton 
                    icono={faMapLocation} 
                    color='#0069AD' 
                    texto='VER MAPA'
                    onclick={showMap}></IconButton>
                <Imagen src={institucion.img} alt='Imagen prueba' />
            </div>
            <div className='puntuacion'>
                {calcularEstrellas()}
            </div>
            <div className='identificacion'>
                {/*<div className='identificacion-name'> {institucion.nombre} </div>*/}
            </div> 
            <div className='info'>
                <div className='info-item'>
                    <div className='info-titulo'>Ranking</div>
                    <div className='info-dato'><span className='text-bold'>{Math.floor(institucion.puntuacion)}</span></div>
                </div>
                <div className='info-item'>
                    <div className='info-titulo'>Tiempo</div>
                    <div className='info-dato'><span className='text-bold'>{institucion.t_promedio}</span></div>
                </div>
                <div className='info-item'>
                    <div className='info-titulo'>Dirección</div>
                    <div className='info-dato'><span className='text-bold'>{institucion.direccion}</span></div>
                </div>
                <div className='info-item'>
                    <div className='info-titulo'>Teléfono</div>
                    <div className='info-dato'><span className='text-bold'>{institucion.telefono}</span></div>
                </div>
                <div className='info-item'>
                    <div className='info-titulo'>Horarios</div>
                    <div className='info-dato'><span className='text-bold'>{institucion.horario}</span></div>
                </div>
            </div>
 
            <div className='stats'>
                <div className='stats-name'>Flujo de personas</div>
                <Stats datos={institucion.dias} />
            </div>
            <PopUpMap
                activar={viewMap} 
                setActivar={setviewMap}
                pos={institucion.mapa}></PopUpMap>
        </div> 
    );
};

export default Tramite;
