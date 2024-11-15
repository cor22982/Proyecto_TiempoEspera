import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./IconMenuLink.css";
import { useState } from "react";

const IconMenuLink = ({ nombre, goto, icono, onClick }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = async () => {
    if (isDisabled) return;
    setIsDisabled(true);
    if (onClick) await onClick();
    setIsDisabled(false);
  };

  return (
    <div className="contenedor" onClick={handleClick} data-testid="contenedor">
      <FontAwesomeIcon icon={icono} className="icon" data-testid="icono" />
      <span className="link-menu" data-testid="nombre-texto">
        {nombre}
      </span>
    </div>
  );
};

export default IconMenuLink;
