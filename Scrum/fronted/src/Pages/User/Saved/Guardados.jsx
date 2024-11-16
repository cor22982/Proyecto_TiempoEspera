import SavedComponent from "@components/Cards/SavedProcedureCard/SavedProcedureCard";
import { useState, useEffect } from "react";
import PopUpSave from "@components/Modals/PopSuave/PopUpSave";
import PopUpDeleteAppointment from "@components/Modals/PopUpDelete_Appointment/PopUpDelete_Appointment";
import useApi from "@hooks/api/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import styles from "./Guardados.module.css";

const Guardados = ({ pi }) => {
  const [showsave, setShowSave] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [information, setInformation] = useState({
    title: "",
    information: "",
    imagen: "",
    address: "",
  });
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
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
      `Se agendó una cita para ${save.institution_name} para el ${save.date} a las ${save.time}`
    );
    setValue("imagen", save.imagen);
    setValue(
      "address",
      `La dirección de la institución es en "${save.adress}"`
    );
    setShowSave(true);
  };

  const handleDelete = (appointmentId) => {
    setAppointmentToDelete(appointmentId);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://deimoss.web05.lol/appointment/${pi}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentId: appointmentToDelete }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSaved((prevSaved) =>
          prevSaved.filter((save) => save.id !== appointmentToDelete)
        );
        Swal.fire("Éxito", "Cita eliminada con éxito.", "success");
      } else {
        Swal.fire("Error", "Hubo un problema al eliminar la cita.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Error en la solicitud DELETE.", "error");
    }

    setShowDelete(false);
  };

  const cancelDelete = () => {
    setShowDelete(false);
  };

  const handleEditDate = (save) => {
    if (isEdited) {
      Swal.fire("Error", "La fecha y hora ya han sido editadas.", "error");
      return;
    }

    const [date, time] = save.date.split(" ");
    setEditDate(date);
    setEditTime(time);
    setShowEditModal(true);
  };

  const handleSaveEditedDate = async (appointmentId) => {
    const newDateTime = `${editDate} ${editTime}`;

    try {
      const response = await fetch(
        `https://deimoss.web05.lol/appointments/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: newDateTime }),
        }
      );

      if (response.ok) {
        setSaved((prevSaved) =>
          prevSaved.map((save) =>
            save.id === appointmentId
              ? { ...save, date: editDate, time: editTime }
              : save
          )
        );
        Swal.fire(
          "¡Éxito!",
          "Fecha y hora actualizadas correctamente.",
          "success"
        );
        setIsEdited(true);
      } else {
        Swal.fire("Error", "No se pudo actualizar la cita.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Error al actualizar la cita.", "error");
    }

    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
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
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDelete(save.id)}
            className={styles.deleteIcon}
            title="Eliminar cita"
          />
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => handleEditDate(save)}
            className={styles.editIcon}
            title="Editar fecha y hora"
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
      <PopUpDeleteAppointment
        activar={showDelete}
        setActivar={setShowDelete}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />
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
                onClick={handleCancelEdit}
                className={`${styles.modalButton} ${styles.modalCancelButton}`}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSaveEditedDate(save.id)}
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
