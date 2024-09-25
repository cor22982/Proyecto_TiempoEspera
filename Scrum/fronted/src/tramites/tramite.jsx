import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faStar, faMapLocation } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import './tramite.css';
import Imagen from '../Components/Image/Image';
import Stats from '../Components/Stats/stats';
import useApi from '@hooks/useApi';
import useToken from '@hooks/useToken';
import MapView from "@components/MapView";
import PopUpMap from './PopUpMap/PopUpMap';
import IconButton from '@components/IconButton';
const Tramite = ({ institucion }) => {
    const [viewMap, setviewMap] = useState(false);
    const showMap = () => {
        setviewMap(true)
    }
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
            <div className='identificacion'>
                {/*<div className='identificacion-name'> {institucion.nombre} </div>*/}
            </div> 
            <div className='info'>
                <div className='info-item'>
                    <div className='info-titulo'>Ranking</div>
                    <div className='info-dato'><span className='text-bold'>{institucion.puntuacion}</span></div>
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
