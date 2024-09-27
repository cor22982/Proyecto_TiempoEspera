import './TextMenuLink.css';

const TextMenuLink = ({ nombre, onClick }) => (
  <div className="menu-option" onClick={onClick}> 
    <span className='link-menu-option'>{nombre}</span> 
  </div>
);

export default TextMenuLink;
