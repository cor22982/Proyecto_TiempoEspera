import TextInput from './LoginTextInput'
import imagen from '../../assets/Login/pi.png'

export default {
  component: TextInput
}

export const LoginTextInputDefault = {
    args:{
        type: 'text',
        value: 'Hola',
        placeholder: 'texto',
        imageUrl: imagen
    }
}