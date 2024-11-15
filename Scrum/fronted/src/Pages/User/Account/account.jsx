import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import useToken from "@hooks/auth/useToken";
import useApi from "@hooks/api/useApi";
import { parseJwt } from "@hooks/auth/useToken";
import styles from "./account.module.css"; // Importa el archivo CSS Module
import Label_Input from "@components/Inputs/Label_Input/Label_Input";

const Account = () => {
  const { token } = useToken();
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [datos, setDatos] = useState({ email: "", telefono: "" }); // Cambia para que tenga propiedades separadas
  const [isEditing, setIsEditing] = useState(false); // Modo de edición
  const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada
  const { llamado } = useApi("https://deimoss.web05.lol/user_Update_info");
  let dpi;
  if (token) {
    const decodedToken = parseJwt(token);
    dpi = decodedToken.dpi;
  }

  const { llamadowithoutbody } = useApi(
    `https://deimoss.web05.lol/userInfo/${dpi}`
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!dpi) {
        Swal.fire("Error", "No DPI found in token", "error");
        return;
      }
      try {
        const data = await llamadowithoutbody("GET");
        setValue("pi", dpi);

        if (data && data.length > 0) {
          setUserData(data[0]);
        } else {
          Swal.fire("Error", "No user data found", "error");
        }
      } catch (apiError) {
        Swal.fire("Error", apiError.toString(), "error");
      }
    };
    fetchData();
  }, [dpi, llamadowithoutbody]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png"];

    if (file && validTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Imagen seleccionada en modo edición
      };
      reader.readAsDataURL(file);
    } else {
      Swal.fire(
        "Error",
        "Por favor, selecciona una imagen en formato PNG o JPG.",
        "error"
      );
    }
  };

  const setValue = (name, value) => {
    setDatos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const UpdateInfo = async (ty) => {
    const body = {
      pi: datos.pi,
      data: ty === "email" ? datos.email : datos.telefono,
      type: ty,
    };
    try {
      const resultado = await llamado(body, "PUT");
      Swal.fire("Éxito", "Información actualizada correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "Error al actualizar la información", "error");
    }
  };

  const updateProfileImage = async () => {
    if (!dpi || !userData?.pi || !selectedImage) {
      Swal.fire(
        "Error",
        "Faltan datos para actualizar la imagen de perfil",
        "error"
      );
      return;
    }

    try {
      const base64Image = selectedImage.split(",")[1];
      const response = await fetch(
        "https://deimoss.web05.lol/user_Update_Image/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dpi,
            pi: userData.pi,
            image: base64Image,
          }),
        }
      );

      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);

      if (response.ok) {
        setUserData((prevData) => ({
          ...prevData,
          imagen_perfil: selectedImage,
        }));
        setImage(selectedImage);
        setIsEditing(false);
        Swal.fire("Éxito", "Imagen actualizada correctamente", "success");
      } else {
        Swal.fire(
          "Error",
          `Error al actualizar la imagen de perfil: ${
            responseData.message || "Error desconocido"
          }`,
          "error"
        );
      }
    } catch (apiError) {
      Swal.fire("Error", apiError.toString(), "error");
    }
  };

  const cancelEdit = () => {
    setSelectedImage(null);
    setIsEditing(false);
  };

  return (
    <div className={styles.accountContainer}>
      <div className={styles.profileImageContainer}>
        <img
          className={styles.profileImage}
          src={
            isEditing
              ? selectedImage ||
                `data:image/png;base64,${userData?.imagen_perfil}`
              : image || `data:image/png;base64,${userData?.imagen_perfil}`
          }
          alt="Profile"
        />
        {!isEditing && (
          <i
            className={`fas fa-pencil-alt ${styles.editIcon}`}
            onClick={() => setIsEditing(true)}
          ></i>
        )}
        <div
          className={styles.editOverlay}
          style={{ opacity: isEditing ? 1 : 0 }}
        >
          {isEditing && (
            <>
              <label htmlFor="file-upload" className={styles.customFileUpload}>
                <i className="fas fa-camera"></i> Cambiar
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
              <div className={styles.editActions}>
                <button className={styles.cancelButton} onClick={cancelEdit}>
                  <i className="fas fa-times"></i>
                </button>
                <button
                  className={styles.confirmButton}
                  onClick={updateProfileImage}
                >
                  <i className="fas fa-check"></i>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <h1 className={styles.accountTitle}>
        {userData
          ? `${userData.name} ${userData.lastname}`
          : "Perfil del Usuario"}
      </h1>
      {userData ? (
        <div className={styles.userInfo}>
          <p>
            <strong>DPI:</strong> {dpi}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <strong>Email:</strong>
            </p>
            <Label_Input
              label_name={userData.email || "-No hay email-"}
              value={datos.email} // Cambiado a datos.email
              onChange={(value) => setValue("email", value)}
              to_Send={() => {
                UpdateInfo("email");
              }}
            ></Label_Input>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <strong>Teléfono:</strong>
            </p>
            <Label_Input
              label_name={userData.telephone || "-No hay telefono-"}
              value={datos.telefono} // Cambiado a datos.telefono
              on_open={() => {
                setValue("telefono", "");
              }}
              onChange={(value) => setValue("telefono", value)}
              to_Send={() => {
                UpdateInfo("telephone");
              }}
            ></Label_Input>
          </div>
          <p>
            <strong>Nombre Completo:</strong>{" "}
            {`${userData.name} ${userData.lastname}`}
          </p>
          <p>
            <strong>Rol:</strong>{" "}
            {userData.type_user === "usuario_comun"
              ? "Usuario Común"
              : userData.type_user}
          </p>
          <p>
            <strong>Edad:</strong> {userData.birthdate}
          </p>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
};

export default Account;
