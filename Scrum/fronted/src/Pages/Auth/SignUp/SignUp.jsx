import CustomButton from "@components/Buttons/CustomButton";
import Dropdowncustom from "@components/Buttons/DropDownCustom";
import {
  faUser,
  faEye,
  faEyeSlash,
  faLock,
  faIdCard,
  faCake,
} from "@fortawesome/free-solid-svg-icons";
import TextInputIcon from "@components/Inputs/TextInput/TextInputIcon";
import useFormLogin from "@hooks/forms/useFormLogin";
import { md5 } from "js-md5";
import { useState } from "react";
import styles from "./SignUp.module.css";

const Registro = () => {
  const { formData, handleChange } = useFormLogin({
    pi: "",
    name: "",
    lastname: "",
    birthdate: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    pi: "",
    name: "",
    lastname: "",
    password_md5: "",
    birthdate: "",
    type_user: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const setValue = (name, value) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDropdownChange = (selectedItem) => {
    setValue("type_user", selectedItem);
  };

  const click = async () => {
    const body = {
      pi: formData.pi,
      name: formData.name,
      lastname: formData.lastname,
      password_md5: md5(formData.password),
      birthdate: formData.birthdate,
      type_user: formState.type_user,
    };

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "https://deimoss.web05.lol/register",
      fetchOptions
    );

    if (response.ok) {
      window.location.reload();
      console.log("success!");
      setErrorMessage("");
      return;
    } else {
      setErrorMessage("Esta intentando ingresar a un usuario no admitido");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerLeftSide}>
        <img src="../src/assets/Login/logotipo.png" alt="Logo" />
      </div>

      <div className={styles.registerRightSide}>
        <div className={styles.contentRightSide}>
          <h1 className={styles.registerTitle}>Registro</h1>
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
              name="name"
              placeholder="Ingrese su nombre"
              value={formData.name}
              onChange={handleChange}
              icon={faUser}
            />
          </div>

          <div>
            <TextInputIcon
              type="text"
              name="lastname"
              placeholder="Ingrese su apellido"
              value={formData.lastname}
              onChange={handleChange}
              icon={faUser}
            />
          </div>

          <div>
            <TextInputIcon
              type="text"
              name="pi"
              placeholder="Ingrese su DPI/CUI"
              value={formData.pi}
              onChange={handleChange}
              icon={faIdCard}
            />
          </div>

          <div style={{ width: "100%" }}>
            <TextInputIcon
              type="date"
              name="birthdate"
              placeholder="Seleccione su fecha de nacimiento"
              value={formData.birthdate}
              onChange={handleChange}
              icon={faCake}
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

          <div>
            <Dropdowncustom
              nombre="Seleccionar rol"
              lista={["usuario_comun", "empleador"]}
              onChange={handleDropdownChange}
            />
          </div>

          <div>
            <CustomButton buttonText="Registrarse" onClick={click} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
