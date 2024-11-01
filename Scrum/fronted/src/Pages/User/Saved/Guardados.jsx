import SavedComponent from "@components/Cards/SavedProcedureCard";
import { useState, useEffect } from "react";
import PopUpSave from "@components/Modals/PopSuave/PopUpSave";
import useApi from "@hooks/api/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Guardados = ({ pi }) => {
  const [showsave, setShowSave] = useState(false);
  const [information, setInformation] = useState({
    title: "",
    information: "",
    imagen: "",
    address: "",
  });
  const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/userAppointments/${pi}`);
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

  //Eliminar cita
  const handleDelete = async (appointmentId) => {
    const { deleteAppointment } = useApi(`https://deimoss.web05.lol/appointments/${appointmentId}`);
    const response = await deleteAppointment(null, "DELETE");

    if (response.succes) {
      setSaved((prevSaved) => prevSaved.filter((save) => save.id !== appointmentId));
    } else {
      console.error("Error al eliminar la cita");
    }
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
            onClick={() => handleDelete(save.id)}
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
    </div>
  );
};

export default Guardados;
