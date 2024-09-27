import React from 'react';
import PropTypes from 'prop-types';
import './CustomButton.css';

const CustomButton = ({ onClick, buttonText }) => {
  return (
    <div className="custom-button-container">
      <button className="custom-button" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default CustomButton;
