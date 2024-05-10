import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStarHalfAlt, faStar } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.css';
import './tramite.css'
import Imagen from '../Components/Image/Image'
import Stats from '../Components/Stats/stats'

const Tramite = ({ institucion }) => {
    // Función para calcular las estrellas
    const calcularEstrellas = () => {
        const puntuacionTotal = 5;
        const puntuacionEntera = Math.floor(institucion.puntuacion);
        const puntuacionDecimal = institucion.puntuacion - puntuacionEntera;
    
        const estrellasEnteras = Array.from({ length: puntuacionEntera }, (_, index) => (
            <FontAwesomeIcon key={`full-${index}`} className='icon-star' icon={faStar} />
        ));
    
        if (puntuacionDecimal >= 0.5) {
            estrellasEnteras.push(<FontAwesomeIcon key={'half'} className='icon-star' icon={faStarHalfAlt} />);
        }
    
        const estrellasRestantes = Array.from({ length: puntuacionTotal - estrellasEnteras.length }, (_, index) => (
            <i key={`empty-${index}`} className="far fa-star"></i>
        ));
    
        return [...estrellasEnteras, ...estrellasRestantes];
    };
    

    return (
        <div className='tramite-container'>
            <div className='header'> <Imagen src={institucion.img} alt='Imagen prueba'/></div>
            <div className='puntuacion'> {calcularEstrellas()} </div>
            <div className='identificacion'>
                {/*<div className='identificacion-name'> {institucion.nombre} </div>*/}
            </div>
            <div className='info'>
                <div className='info-item'>
                    <div className='info-titulo'>Tiempo promedio</div>
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
                <div className='stats-name'> Flujo de personas </div>
                <Stats datos={institucion.dias} />
            </div>
            <div className='mapa'>
                <div className='mapa_titulo'>Cómo llegar</div>
                <div className='mapa_api'><Imagen src={institucion.mapa} alt='Imagen prueba'/></div>
            </div>
        </div>
    )
}

export default Tramite;