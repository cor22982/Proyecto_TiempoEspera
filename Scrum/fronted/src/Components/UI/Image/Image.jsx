import './Image.css'
import PropTypes from 'prop-types'

const ImageComponent = ({ src, alt, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div className="image-container" onClick={handleClick}>
      <img
        src={src}
        alt={alt}
        className="image"
      />
    </div>
  )
}

ImageComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

export default ImageComponent