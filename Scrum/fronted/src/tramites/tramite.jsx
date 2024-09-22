import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import './tramite.css';
import Imagen from '../Components/Image/Image';
import Stats from '../Components/Stats/stats';
import MapView from '../Components/MapView/MapView';
import useApi from '@hooks/useApi';
import useToken from '@hooks/useToken';

const Tramite = ({ institucion }) => {
    

    return (
        <div className='tramite-container'>
            <div className='header'>
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
            <div className='mapa'>
                <div className='mapa_titulo'>Cómo llegar</div>
                <div className='mapa_api'>
                    <MapView position={institucion.mapa}></MapView>                  
                </div>
            </div>
        </div>
    );
};

export default Tramite;
