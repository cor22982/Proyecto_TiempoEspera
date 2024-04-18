import './SearchInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const SearchInput = ({icono, placeholder,onChange,value}) => {
  return (
    <div className='searched'>
      <FontAwesomeIcon icon={icono} className="icon-serchad" />
      
      <input
          placeholder={placeholder} 
          onChange={({ target: { value }}) => onChange(value)}
          value={value}
          className='input-search'></input>
    </div>
  )
}

export default SearchInput