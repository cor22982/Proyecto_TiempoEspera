import './TextMenuLink.css';
import { Link } from 'react-router-dom';

const TextMenuLink = ({ nombre, goto, isInStorybook }) => (
  <div className="menu-option">
    {isInStorybook ? (
      <span className='link-menu-option'>{nombre}</span>
    ) : (
      <Link to={goto} className='link-menu-option'>{nombre}</Link>
    )}
  </div>
);

export default TextMenuLink;
