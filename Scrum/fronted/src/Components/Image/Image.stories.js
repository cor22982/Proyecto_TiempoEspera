import Image from './Image'
import image from '../../assets/calle.jpg'

export default {
  component: Image
}

export const ImageDefault = {
  args: {
    src: image,
    alt: 'Imagen de prueba'
  }
}