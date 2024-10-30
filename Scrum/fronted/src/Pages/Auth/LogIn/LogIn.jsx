import React, { useContext, useState } from "react";
import CustomButton from "@components/Buttons/CustomButton";
import { md5 } from "js-md5";
import LoginContext from "../../../Contexts/LoginContex/LoginContext";
import Dropdowncustom from "@components/Buttons/DropDownCustom";
import useToken from "@hooks/auth/useToken";
import {
  faUser,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import TextInputIcon from "@components/Inputs/TextInput/TextInputIcon";
import useFormLogin from "@hooks/forms/useFormLogin";
import styles from "./LogIn.module.css";

const Login = ({ onToggle, onLogin }) => {
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
    const { acces_token } = await response.json();

    if (response.ok) {
      setToken(acces_token);
      setLoggedIn(true);
      setErrorMessage("");
      onLogin();
      return;
    }
    setErrorMessage("Incorrect user or password");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeftSide}>
        <img src="../src/assets/Login/logotipo.png" alt="Logo" />
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

          <div className={styles.loginDpiContainer}>
            <TextInputIcon
              type="text"
              name="pi"
              placeholder="Ingrese su DPI/CUI"
              value={formData.pi}
              onChange={handleChange}
              icon={faUser}
            />
          </div>

          <div className={styles.loginPasswordContainer}>
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

          <div className={styles.loginButtonContainer}>
            <CustomButton buttonText="Iniciar sesión" onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
