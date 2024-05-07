import PropTypes from 'prop-types';
import './institution.css';

const InsttutionComponent = ({name, image, onClick, tiempo}) =>{
    return(
        <div className="container" onClick= {onClick}>
            <div className='imagen-conteiner'>
                <img src={image} alt="institution" className="institution-image" onClick={onClick}/>
            </div>
                
            
            <div className = 'info-container'>
                <h1 className="heading1">{name}</h1>
                <br></br>
                <h2 className = "heading">Tiempo Promedio</h2>
                <h3 className="timelapmse">{tiempo}</h3>
            </div>

        </div>
    );
}

InsttutionComponent.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    tiempo: PropTypes.string.isRequired
}

export default InsttutionComponent;
