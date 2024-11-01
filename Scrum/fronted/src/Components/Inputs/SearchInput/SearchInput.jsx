import styles from "./SearchInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";

const SearchInput = ({
  icono,
  placeholder,
  onChange,
  value,
  onpressenter,
  suggestions,
}) => {
  const [suggestion, setSuggestion] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);

  const minCharToSearch = 2;

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Llamar a la función de búsqueda al presionar Enter
    }

    if (event.key === "Tab" && suggestion) {
      event.preventDefault(); // Prevenir el comportamiento por defecto de Tab
      onChange(value + suggestion); // Completar con la sugerencia inline
      setFilteredSuggestions([]); // Limpiar sugerencias
      setSuggestion("");
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (filteredSuggestions.length > 0) {
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1
        );
      }
    }

    if (event.key === "ArrowUp") {
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
      setSuggestion(""); // Limpiar la sugerencia después de seleccionar
    }
    onpressenter(); // Ejecutar la búsqueda al presionar Enter o al hacer clic en el ícono
  };

  const handleInputChange = (inputValue) => {
    onChange(inputValue);

    if (inputValue.trim().length >= minCharToSearch) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );

      const startsWithSuggestions = filtered.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
      );

      if (startsWithSuggestions.length > 0) {
        const remainingText = startsWithSuggestions[0].slice(inputValue.length);
        setSuggestion(remainingText); // Mostrar la parte restante inline
        setFilteredSuggestions([]); // No mostrar dropdown si es inline
      } else {
        setSuggestion("");
        setFilteredSuggestions(filtered); // Mostrar dropdown si no es inline
        setActiveSuggestionIndex(-1); // Reiniciar el índice activo
      }
    } else {
      setSuggestion("");
      setFilteredSuggestions([]);
    }
  };

  const clearInput = () => {
    onChange(""); // Limpiar el campo de entrada
    setSuggestion("");
    setFilteredSuggestions([]);
    setActiveSuggestionIndex(-1);
  };

  return (
    <div className={styles.autocompleteContainer}>
      <div
        className={styles.searchIconContainer}
        onClick={handleSearch}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={icono} className={styles.iconSerchad} />
      </div>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          placeholder={placeholder}
          onChange={({ target: { value } }) => handleInputChange(value)}
          value={value}
          className={styles.inputSearch}
          onKeyDown={handleKeyPress}
        />
        {value && (
          <button
            className={styles.clearButton}
            onClick={clearInput}
            tabIndex={-1}
          >
            ×
          </button>
        )}
        {suggestion && (
          <span className={styles.inputSuggestion}>
            {value}
            <span className={styles.suggestionText}>{suggestion}</span>
          </span>
        )}
        {filteredSuggestions.length > 0 && (
          <ul className={styles.suggestionsList}>
            {filteredSuggestions.map((filteredSuggestion, index) => (
              <li
                key={index}
                className={`${styles.suggestionItem} ${
                  index === activeSuggestionIndex ? styles.active : ""
                }`}
                onClick={() => {
                  onChange(filteredSuggestion);
                  setFilteredSuggestions([]);
                  setSuggestion("");
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
