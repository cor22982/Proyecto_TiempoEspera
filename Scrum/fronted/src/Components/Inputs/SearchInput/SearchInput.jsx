import './SearchInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef } from 'react';

const SearchInput = ({ icono, placeholder, onChange, value, onpressenter, suggestions }) => {
  const [suggestion, setSuggestion] = useState(''); // Para el autocompletado inline
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Para el dropdown de sugerencias
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // Para las teclas de navegación
  const inputRef = useRef(null);

  const minCharToSearch = 2;

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Llamar a la función de búsqueda al presionar Enter
    }

    if (event.key === 'Tab' && suggestion) {
      event.preventDefault(); // Prevenir el comportamiento por defecto de Tab
      onChange(value + suggestion); // Completar con la sugerencia inline
      setFilteredSuggestions([]); // Limpiar sugerencias
      setSuggestion('');
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (filteredSuggestions.length > 0) {
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1
        );
      }
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (filteredSuggestions.length > 0) {
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex === 0 ? filteredSuggestions.length - 1 : prevIndex - 1
        );
      }
    }
  };

  const handleSearch = () => {
    if (activeSuggestionIndex !== -1 && filteredSuggestions.length > 0) {
      onChange(filteredSuggestions[activeSuggestionIndex]); // Completar con la sugerencia seleccionada
      setFilteredSuggestions([]);
    } else if (suggestion) {
      onChange(value + suggestion); // Completar inline con la sugerencia
      setSuggestion(''); // Limpiar la sugerencia después de seleccionar
    }
    onpressenter(); // Ejecutar la búsqueda al presionar Enter o al hacer clic en el ícono
  };

  const handleInputChange = (inputValue) => {
    onChange(inputValue);

    if (inputValue.trim().length >= minCharToSearch) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );

      const startsWithSuggestions = filtered.filter(suggestion =>
        suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
      );

      if (startsWithSuggestions.length > 0) {
        const remainingText = startsWithSuggestions[0].slice(inputValue.length);
        setSuggestion(remainingText); // Mostrar la parte restante inline
        setFilteredSuggestions([]); // No mostrar dropdown si es inline
      } else {
        setSuggestion('');
        setFilteredSuggestions(filtered); // Mostrar dropdown si no es inline
        setActiveSuggestionIndex(-1); // Reiniciar el índice activo
      }
    } else {
      setSuggestion('');
      setFilteredSuggestions([]);
    }
  };

  const clearInput = () => {
    onChange(''); // Limpiar el campo de entrada
    setSuggestion('');
    setFilteredSuggestions([]);
    setActiveSuggestionIndex(-1);
  };

  return (
    <div className="autocomplete-container">
      <div className="search-icon-container" onClick={handleSearch} style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={icono} className="icon-serchad" />
      </div>
      <div className="input-wrapper">
        <input
          ref={inputRef}
          placeholder={placeholder}
          onChange={({ target: { value } }) => handleInputChange(value)}
          value={value}
          className="input-search"
          onKeyDown={handleKeyPress} // Escuchar teclas, incluyendo Enter
        />
        {value && (
          <button className="clear-button" onClick={clearInput} tabIndex={-1}>
            ×
          </button>
        )}

        {/* Inline Autocompletado */}
        {suggestion && (
          <span className="input-suggestion">
            {value}
            <span className="suggestion-text">{suggestion}</span>
          </span>
        )}

        {/* Dropdown para las sugerencias */}
        {filteredSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((filteredSuggestion, index) => (
              <li
                key={index}
                className={`suggestion-item ${index === activeSuggestionIndex ? 'active' : ''}`}
                onClick={() => {
                  onChange(filteredSuggestion); // Completar el valor del input
                  setFilteredSuggestions([]); // Limpiar sugerencias
                  setSuggestion(''); // Reiniciar autocompletado inline
                  setActiveSuggestionIndex(-1);
                  inputRef.current.focus();
                }}
              >
                {filteredSuggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchInput;

