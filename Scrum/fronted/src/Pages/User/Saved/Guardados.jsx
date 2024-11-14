import SavedComponent from "@components/Cards/SavedProcedureCard";
import { useState, useEffect } from "react";
import PopUpSave from "@components/Modals/PopSuave/PopUpSave";
import useApi from "@hooks/api/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PopUpDeleteAppointment from "../../../Components/Modals/PopUpDelete_Appointment/PopUpDelete_Appointment";

const Guardados = ({ pi }) => {
  const [showsave, setShowSave] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [information, setInformation] = useState({
    title: "",
    information: "",
    imagen: "",
    address: "",
  });
  const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/userAppointments/${pi}`);
  const [saved, setSaved] = useState([]);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

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
      `Se agendo una cita para ${save.institution_name} para el ${save.date} a las ${save.time}`
    );
    setValue("imagen", save.imagen);
    setValue(
      "address",
      `La direccion de la institucion es en  "${save.adress}"`
    );
    setShowSave(true);
  };

  // Eliminar cita
  const handleDelete = (appointmentId) => {
    console.log("ID de cita recibido en handleDelete:", appointmentId);
    setAppointmentToDelete(appointmentId); // Guardamos la cita seleccionada
    console.log("Cita a eliminar:", appointmentId); // Asegúrate de que el ID se guarda correctamente
    setShowDelete(true); // Activamos el PopUpDeleteAppointment
  };

  // Confirmación de eliminación en el frontend
  const confirmDelete = async () => {
  console.log("Cita a eliminar:", appointmentToDelete);  // Verifica que 'appointmentToDelete' contiene el ID correcto

  try {
    const response = await fetch(`https://deimoss.web05.lol/appointment/${pi}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointmentId: appointmentToDelete }), // Asegúrate de que 'appointmentToDelete' tenga el valor correcto
    });

    const result = await response.json();
    console.log("Respuesta del servidor:", result);

    if (result.success) {
      setSaved((prevSaved) =>
        prevSaved.filter((save) => save["id appointment"] !== appointmentToDelete) // Filtra la cita eliminada
      );
      alert("Cita eliminada con éxito.");
    } else {
      console.error("Error al eliminar la cita: operación no exitosa en el backend.");
      alert("Hubo un error al eliminar la cita.");
    }
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
    alert("Error en la solicitud DELETE.");
  }

  setShowDelete(false); // Cierra el popup después de confirmar la eliminación
};

  const cancelDelete = () => {
    setShowDelete(false); // Cerramos el popup sin eliminar
  };
  
  return (
    <div style={{ padding: "10px", gap: "10px" }}>
      {saved.map((save, index) => (
        <div key={index} style={{ position: "relative", marginBottom: "5px" }}>
          <SavedComponent
            image={save.imagen}
            title={save.name}
            description={`Agendada para el ${save.date} a la hora ${save.time}`}
            funtion={() => pressOnSave(save)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDelete(save["id appointment"])}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              color: "red",
              fontSize: "1.5rem"
            }}
            title="Eliminar cita"
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
    </div>
  );
};

export default Guardados;