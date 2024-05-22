import './TextInput.css'
import PropTypes from 'prop-types'

const TextInput = ({ type, name, placeholder, value, onChange }) => {
  return (
    <div className='textinput'>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  )
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TextInput