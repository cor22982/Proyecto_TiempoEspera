import SavedComponent from "@components/Cards/SavedProcedureCard";
import { useState, useEffect } from "react";
import PopUpSave from "@components/Modals/PopSuave/PopUpSave";
import useApi from "@hooks/api/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import styles from "./Guardados.module.css";

const Guardados = ({ pi }) => {
  const [showsave, setShowSave] = useState(false);
  const [information, setInformation] = useState({
    title: "",
    information: "",
    imagen: "",
    address: "",
  });
  const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar el modal de edición
  const [editDate, setEditDate] = useState(""); // Estado para manejar la fecha editada
  const [editTime, setEditTime] = useState(""); // Estado para manejar la hora editada
  const [isEdited, setIsEdited] = useState(false); // Estado para saber si ya se ha editado la fecha y hora
  const { llamadowithoutbody } = useApi(
    `https://deimoss.web05.lol/userAppointments/${pi}`
  );
  const [saved, setSaved] = useState([]);

  const setValue = (name, value) => {
    setInformation((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getSaved = async () => {
      const response = await llamadowithoutbody("GET");
      setSaved(response);
    };
    getSaved();
  }, [llamadowithoutbody, pi]);

  const pressOnSave = (save) => {
    setValue("title", save.name);
    setValue(
      "information",
      `Se agendo una cita para ${save.institution_name} para el ${save.date} a las ${save.time} `
    );
    setValue("imagen", save.imagen);
    setValue(
      "address",
      `La direccion de la institucion es en  "${save.adress}`
    );
    setShowSave(true);
  };

  // Eliminar cita
  const handleDelete = async (appointmentId) => {
    try {
      const response = await fetch(
        `https://deimoss.web05.lol/appointments/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.succes) {
        setSaved((prevSaved) =>
          prevSaved.filter((save) => save.id !== appointmentId)
        );
      } else {
        console.error("Error al eliminar la cita");
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
  };

  // Abrir modal de edición de fecha y hora
  const handleEditDate = (save) => {
    if (isEdited) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "La fecha y hora ya han sido editadas, no se puede modificar nuevamente.",
      });
      return;
    }

    const [date, time] = save.date.split(" "); // Suponiendo que la fecha y hora están en el formato "YYYY-MM-DD HH:MM"
    setEditDate(date); // Setea la fecha
    setEditTime(time); // Setea la hora
    setShowEditModal(true); // Muestra el modal de edición
  };

  // Función para manejar la actualización de la fecha y hora
  const handleSaveEditedDate = async (appointmentId) => {
    const newDateTime = `${editDate} ${editTime}`;

    console.log("Actualizar la cita con ID:", appointmentId, "a:", newDateTime);

    // Aquí se debe agregar el endpoint para actualizar la cita con la nueva fecha y hora
    setIsEdited(true); // Marca como editado
    setShowEditModal(false); // Cierra el modal de edición

    Swal.fire({
      icon: "success",
      title: "¡Fecha y hora actualizadas!",
      text: "La cita ha sido actualizada correctamente.",
    });
  };

  // Función para manejar la cancelación de la edición
  const handleCancelEdit = () => {
    setShowEditModal(false);
    Swal.fire({
      icon: "info",
      title: "Edición cancelada",
      text: "No se han realizado cambios en la fecha y hora.",
    });
  };

  return (
    <div className={styles.container}>
      {saved.map((save, index) => (
        <div key={index} className={styles.cardContainer}>
          <SavedComponent
            image={save.imagen}
            title={save.name}
            description={`Agendada para el ${save.date} a la hora ${save.time}`}
            funtion={() => pressOnSave(save)}
          />
          {/* Botón para eliminar */}
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDelete(save.id)}
            className={styles.deleteIcon}
            title="Eliminar cita"
          />
          {/* Botón para editar fecha y hora */}
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => handleEditDate(save)} // Muestra el modal para editar la fecha y hora
            className={styles.editIcon}
            title="Editar fecha y hora"
            disabled={isEdited} // Deshabilita el botón si ya se editó
          />
        </div>
      ))}

      <PopUpSave
        activar={showsave}
        setActivar={setShowSave}
        nombre={information.title}
        description={information.information}
        image={information.imagen}
        address={information.address}
      />

      {/* Modal de edición de fecha y hora */}
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Editar Fecha y Hora</h3>
            <div style={{ marginBottom: "10px" }}>
              <label>Fecha:</label>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label>Hora:</label>
              <input
                type="time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <button
                onClick={handleCancelEdit} // Llama a la función de cancelar
                className={`${styles.modalButton} ${styles.modalCancelButton}`}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSaveEditedDate(save.id)} // Llama a la función para guardar la fecha y hora editadas
                className={`${styles.modalButton} ${styles.modalSaveButton}`}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guardados;
