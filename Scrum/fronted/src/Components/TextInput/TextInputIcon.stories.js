import TextInputIcon from './TextInputIcon'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default {
  component: TextInputIcon
}

export const InputPassword = {
  args: {
    type: 'text',
    placeholder: 'Ingresa tu contraseña',
    icon: faEyeSlash
  }
}