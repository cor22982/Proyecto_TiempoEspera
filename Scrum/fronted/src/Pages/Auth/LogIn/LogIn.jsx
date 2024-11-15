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
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAgAElEQVR4Ae3dCZhU1bnv/845OSf3/v835yYePRpjFKEVQRwRRYOK4gTYGgXEgSg4oagIkjhrREBAZpnUOKA4BkJQRFFBQEAxMmMLKjY2czdTAz03Xd7nLevXWWyquubuqupvP0/12vNa67PX2m/tXbt2ZWXxhwACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAJRCxx55JGHNmnSJPu4445rbK8TTjihUbNmzY5p3rz50cFeNk8vWzYVX02bNj22Pl8yady48dHHH3/8b4855pjfHHHEEYc1atToV4cccsh/HXnkkf9fVlbWz6LeWayAAAIIIIBAKIEhQ4YM+/HHH328kmPg8/l81dXVQX1temVlZVVFRUXJrl27dhcUFGzLz8/fsGbNmjVLlixZMn/+/E8/+OCDD959992pr7322svPPPPMqEcfffSxu+66665u3bpd1759+0tOPfXUU7Ozs/8r1P5lOgIIIIBAAxEYNmzYiB/5i1vA57OYHfqvurr6R1vGu1ywad6tuOu4w3oTZm8MKioqygsLCzeuWrVq2YcffvjhSy+99Er//v2f7NGjx62XX355uyZNmvyugTRpqokAAgg0TIFnnnlmRFVVVe3RyBthGD9IQIFZ6UELRDAh2LqaVlFRccCbgf379/9YWVlZM83eMOhNgzcru0qwf/9+X2lpaUVeXt6377///kfjx48f/8gjj/TJyclpzxl+w+z71BoBBDJM4Omnnx5pgYC/5AooMFvqBl8bT8afm1+o7QfytnjvKygo2LJo0aLZzz777Lh77rnnttatWzfLsKZOdRBAAIHMFhgzZsxIO+C7AYDhny6NR+OgoBlqHc2vLdW6OtO2cRu2s3H9aRl3XPO1vKXun6Zrmo17z+61juVXVVXlz3P37t27FyxY8OmECRNGXH755Ve1bNnyPzK7N1A7BBBAII0FRo8ePdIO7vzVj4AFUgXT2kpgQTvccqG2pfXssr27r226BXD7U6oyaJ7lq3nFxcVVK1asWDpx4sSxV1555VVp3OwpOgIIIJB5ApyhR382rsDppgqEodJIl9VyobbjnR5qeZtugdhS+1NQ1vp2Fq55SjUv2Li7vubv27ev9OOPP5798MMP/7lRo0aNMq93UCMEEEAgjQTsDF0HaB3QSRGIVsBuuvvqq6+WP/HEE4/bMwDSqAtQVAQQQCAzBAjo0YYulg8nUFpaWr169eoV/fr169eoUaP/lRk9hVoggAACKS4wZsyYEZyhhwtRzI9EYO/evTWL2ef19rdv376Sv/3tb39r3779hSneFSgeAgggkN4CBPSaGMRAggXcm/DsM/hly5Ytv/nmm7und4+h9AgggECKChDQExzFGujmLGBbAHdvnhOFztY1vn79+h/uv//+PinaJSgWAgggkJ4CBHSFGdJE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YmRTt27dum779u1+H/t2RsCrMJBPzbimK9V8K+vmzZsLJk2aNDGyHBO/1CWXXHLOtm3btln5t27dWlBUVFSwcePGguLiYu332urh32/FxcU7Nm3aVHDjjTfelPgSRr5Fe+DVuHHjRi1dunTFjz/+WLl//37/sy7Ut6zvqB9pmqU23Xu8CBxLfFu3bt04Y8aMv9100003RF6S+lmyZ8+ePWbNmjWjvLx8l30869bJ6uOOW73d55zohMgOp1u2bCmcMWPGe/fcc0/vM88887/rpzZOrgR0ByODB+2pdRYIrJOqQVrDdRuq23HTdVhvVCy1em7ZsmVbInbr7NmzPwllYnmZazJfbt76euaxxx57TLR1e/LJJx/Vtqzc8gpTdl+83+svLS0tsYOk5ePm6Q7XVgaV2QJptHVO1PIjR44cq3Iotf5jH13VVnabZ3/WHlXf3r171/kPCR1//PGHjho1asi2bds262FVqodS20duMLOy2z1JOmZoOZvuLqeP72RRUVFROn369H9cdNFFbRLlH+927KmgL7zwwoR9+/bts/rbvlC5Va9gqS2nfWjzbdg8bN+708vKyqpXrly5dNCgQQNbtWp1YrzljWn9TA7o8R6EYgJN4ZXatGlzVnFx8R5rlN4OGqwhp+M09yATKL/PHt0b726ZO3fux7Y969yWhzq1TXM7dbLMdFAJ1M//GwGx3PQ5ePDgR+xszLan+kRQZp89Ljkew/Ly8pII8gm5iBkHyuw7//zzL4inLLGuu2nTph/kZgXVR1ghCx16hu/OO++8I9ZyRLte8+bNj3j77bdf27NnT7kVSUHMTL1Byebb9GBtWvvADOzlXcYCv/7kZGe/n3322RcXX3zxJdGWO5HLjxgxYuC+ffv83wDyHiPkobrbfJVf9aktDba8fW162bJlX9x99929srKy6u4HowjoiWw2qb+tiy++uENJSUmZNVBryNaho2m8tTXs+pyng0uQuviuvPLKnHj3zJw5c2Zb/dw3QsrTpttwMl+Whw5EgQOQL5Yz9KeeeupR7+XVCMrvi+XyvmteUlJSon3jdYsgf1uk5u+5554b6267LobPPffcM203Wx3cAKD2EG7fazntw759+9ZJQB87duyTgcdH+/2Uv9VDwzbDrZOgbRl7uftL85TaPNXNpmm7tm2b7mzXN3Xq1Oknn3xynd7XZL+psXr1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BBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQACBNBH4fy4BgQl5MbJcAAAAAElFTkSuQmCC"
          alt="Logo"
        />
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
