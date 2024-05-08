import './MenuOption.css'
import { Link } from 'react-router-dom';

const MenuOption = ({ nombre, goto }) => (
  <div className="menu-option"> 
    <Link to={goto} className='link-menu-option'>{nombre}</Link> 
  </div>
);

export default MenuOption;
