import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconMenuLink.css'

const IconMenuLink = ({ nombre, goto, icono, isInStorybook }) => (
  <div className='contenedor'> {/* Volver a usar 'contenedor' */}
    <FontAwesomeIcon icon={icono} className="icon" />
    {isInStorybook ? (
      <span>{nombre}</span>
    ) : (
      <Link to={goto} className='link-menu'>{nombre}</Link>
    )}
  </div>
);

export default IconMenuLink