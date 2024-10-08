import './LogIn.css';
import { useContext,useState } from 'react'
import CustomButton from '@components/Buttons/CustomButton';
import { md5 } from 'js-md5'
import LoginContext from '@contexts/LoginContex/LoginContext';
import Dropdowncustom from '@components/Buttons/DropDownCustom';
import useToken from '@hooks/auth/useToken'
import {faUser, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import TextInputIcon from '@components/Inputs/TextInput/TextInputIcon';
import useFormLogin from '@hooks/forms/useFormLogin'

const Login = ({ onToggle, onLogin }) => {  // Recibe las funciones desde el componente padre (Indice)
  const [formState, setFormState] = useState({ pi: '', type_user: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const { formData, handleChange } = useFormLogin({ pi: '', password: '' });
  const { setLoggedIn } = useContext(LoginContext);
  const { setToken } = useToken();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDropdownChange = (selectedItem) => {
    setValue('type_user', selectedItem);
  };

  const setValue = (name, value) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleClick = async () => {
    const body = { pi: formData.pi, rol: formState.type_user, password: md5(formData.password) };
    console.table(body);
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch('https://deimoss.web05.lol/login', fetchOptions);
    const { acces_token } = await response.json();

    if (response.ok) {
      setToken(acces_token);
      setLoggedIn(true);
      setErrorMessage('');
      onLogin();  // Llamada a onLogin para cambiar la vista a Pages
      return;
    }
    setErrorMessage('Incorrect user or password');
  };

  return (
    <div className='login-container'>
      <div className='login-left-side'>
        <img src='../src/assets/Login/logotipo.png' alt='Logo' />
      </div>

      <div className='login-right-side'>
        <div className='content-right-side'>
          <h1 className='login-title'>Iniciar sesión</h1>
          {errorMessage && (
            <div className='error-message' onClick={() => setErrorMessage('')}>
              {errorMessage}
            </div>
          )}

          <div className='login-dpi-container'>
            <TextInputIcon
              type='text'
              name='pi'
              placeholder='Ingrese su DPI/CUI'
              value={formData.pi}
              onChange={handleChange}
              icon={faUser}
            />
          </div>

          <div className='login-password-container'>
            <TextInputIcon
              type='password'
              name='password'
              placeholder='Ingrese su contraseña'
              value={formData.password}
              onChange={handleChange}
              icon={faLock}
              iconOnClick={showPassword ? faEye : faEyeSlash}
              onIconClick={handlePasswordVisibility}
            />
          </div>

          <div className='login-rol-container'>
            <Dropdowncustom
              nombre='Seleccionar rol'
              lista={['usuario_comun', 'empleador']}
              onChange={handleDropdownChange}
            />
          </div>

          <div className='login-register-container'>
            <div className='text-info-register-container'>¿No te has registrado aún?</div>
            <div className='text-register-container' onClick={onToggle} style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}}> {/* Aquí manejas el cambio a la vista de registro */}
              Registrate aquí
            </div>
          </div>

          <div className='login-button-container'>

            <CustomButton buttonText='Iniciar sesion' onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
