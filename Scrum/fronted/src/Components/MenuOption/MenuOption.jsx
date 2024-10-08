import './MenuOption.css';

const MenuOption = ({ nombre, onClick }) => (
  <div className="menu-option" onClick={onClick}> 
    <span className='link-menu-option'>{nombre}</span> 
  </div>
);

export default MenuOption;
