import React from 'react';
import PropTypes from 'prop-types';
import './institution.css';

const insttutionComponent = ({name, image, onClick, tiempo}) =>{
    return(
        <div className="container" onClick= {onClick}>
            <div className = "image-container">
                <img src={image} alt="institution" className="institution-image" onClick={onClick}/>
            </div>
            <div className = 'info-container'>
                <h1 className="heading">{name}</h1>
                <h2 className = "heading">Tiempo Promedio</h2>
                <h3 className="heading">{tiempo}</h3>
            </div>

        </div>
    );
}

insttutionComponent.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    tiempo: PropTypes.string.isRequired
}

export default insttutionComponent;
