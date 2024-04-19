import './SearchInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const SearchInput = ({icono, placeholder,onChange,value, onpressenter}) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Llama a la función que quieres ejecutar aquí
      onpressenter()
    }
  };
  return (
    <div className='searched'>
      <FontAwesomeIcon icon={icono} className="icon-serchad" />
      
      <input
          placeholder={placeholder} 
          onChange={({ target: { value }}) => onChange(value)}
          value={value}
          className='input-search'
          onKeyDown={handleKeyPress}></input>
    </div>
  )
}

export default SearchInput