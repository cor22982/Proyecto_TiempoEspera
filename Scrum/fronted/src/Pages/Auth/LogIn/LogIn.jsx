import React, { useContext, useState } from "react";
import CustomButton from "@components/Buttons/CustomButton";
import { md5 } from "js-md5";
import LoginContext from "@contexts/LoginContex/LoginContext";
import Dropdowncustom from "@components/Buttons/DropDownCustom/DropDownCustom";
import useToken from "@hooks/auth/useToken";
import Spinner from "@components/UI/Spinner/Spinner";
import {
  faUser,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import TextInputIcon from "@components/Inputs/TextInput/TextInputIcon";
import useFormLogin from "@hooks/forms/useFormLogin";
import Swal from "sweetalert2"; // Importamos SweetAlert
import styles from "./LogIn.module.css";

const Login = ({ onToggle, onLogin, onForgotPassword }) => {
  const [formState, setFormState] = useState({
    pi: "",
    type_user: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { formData, handleChange } = useFormLogin({ pi: "", password: "" });
  const { setLoggedIn } = useContext(LoginContext);
  const { setToken } = useToken();
  const [loading, setLoading] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDropdownChange = (selectedItem) => {
    setValue("type_user", selectedItem);
  };

  const setValue = (name, value) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleClick = async () => {
    setLoading(true);

    // Validación de campos vacíos
    if (!formData.pi) {
      setLoading(false);
      setErrorMessage("Por favor, ingresa tu DPI/CUI.");
      return;
    }

    if (!formData.password) {
      setLoading(false);
      setErrorMessage("Por favor, ingresa tu contraseña.");
      return;
    }

    if (!formState.type_user) {
      setLoading(false);
      setErrorMessage("Por favor, selecciona un rol.");
      return;
    }

    const body = {
      pi: formData.pi,
      rol: formState.type_user,
      password: md5(formData.password),
    };
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "https://deimoss.web05.lol/login",
      fetchOptions
    );

    // Respuesta de la API
    const data = await response.json();

    if (response.ok) {
      const { acces_token } = data;
      setToken(acces_token);
      setLoggedIn(true);
      setErrorMessage("");

      // Mostramos el mensaje de bienvenida con SweetAlert
      Swal.fire({
        icon: "success",
        title: "Bienvenido!",
        text: "Has iniciado sesión con éxito.",
        confirmButtonText: "Aceptar",
      });

      onLogin();
    } else {
      setLoading(false);
      // Controlar errores según la respuesta del backend
      if (data.error === "usuario_incorrecto") {
        setErrorMessage("Usuario incorrecto.");
      } else if (data.error === "contraseña_incorrecta") {
        setErrorMessage("Contraseña incorrecta.");
      } else if (data.error === "no_existe_usuario") {
        setErrorMessage("No existe un usuario con ese DPI/CUI.");
      } else if (data.error === "rol_no_seleccionado") {
        setErrorMessage("Por favor, selecciona un rol.");
      } else {
        setErrorMessage("Datos incorrectos. Ingresalos nuevamente");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeftSide}>
        <img src="" alt="Logo" />
      </div>

      <div className={styles.loginRightSide}>
        <div className={styles.contentRightSide}>
          <h1 className={styles.loginTitle}>Iniciar sesión</h1>
          {errorMessage && (
            <div
              className={styles.errorMessage}
              onClick={() => setErrorMessage("")}
            >
              {errorMessage}
            </div>
          )}

          <div>
            <TextInputIcon
              type="text"
              name="pi"
              placeholder="Ingrese su DPI/CUI"
              value={formData.pi}
              onChange={handleChange}
              icon={faUser}
            />
          </div>

          <div>
            <TextInputIcon
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChange={handleChange}
              icon={faLock}
              iconOnClick={showPassword ? faEye : faEyeSlash}
              onIconClick={handlePasswordVisibility}
            />
          </div>

          <div className={styles.loginRolContainer}>
            <Dropdowncustom
              nombre="Seleccionar rol"
              lista={["usuario_comun", "empleador", "administrador"]}
              onChange={handleDropdownChange}
            />
          </div>

          <div className={styles.loginRegisterContainer}>
            <div className={styles.textInfoRegisterContainer}>
              ¿No te has registrado aún?
            </div>
            <div
              className={styles.textRegisterContainer}
              onClick={onToggle}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Registrate aquí
            </div>
          </div>
          <div className={styles.loginRegisterContainer}>
            <div className={styles.textInfoRegisterContainer}>
              ¿Perdiste tu contraseña?
            </div>
            <div
              className={styles.textRegisterContainer}
              onClick={onForgotPassword}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Olvide la contraseña
            </div>
          </div>

          <div className={styles.loginButtonContainer}>
            {loading ? (
              <Spinner />
            ) : (
              <CustomButton buttonText="Iniciar sesión" onClick={handleClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
