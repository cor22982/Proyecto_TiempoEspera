import styles from "./Cita.module.css";
import useApi from "@hooks/api/useApi";
import TextInputIcon from "@components/Inputs/TextInput/TextInputIcon";
import Button from "@components/Buttons/CustomButton/CustomButton";
import {
  faCalendar,
  faClock,
  faFile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useFormCita from "@hooks/forms/useFormCita";
import PopUpAgendar from "@components/Modals/PopUpAgendar/PopUpAgendar";
import PopUpAgendarError from "@components/Modals/PopUpAgendar/PopUpAgendarError";
import PopUpConfirmation from "@components/Modals/PopUpConfirmation/PopUpConfirmation";

const Cita = ({ data }) => {
  const [userData, setUserData] = useState(null);
  const { llamadowithoutbody } = useApi(
    `https://deimoss.web05.lol/users/${data.pi_user}`
  );
  const { llamado } = useApi("https://deimoss.web05.lol/newAppointment");
  const { formData, handleChange } = useFormCita({
    time: "",
    date: "",
    name_user: "",
    procedure_name: "",
    pi: data.pi_user,
  });
  const [agendar, setAgendar] = useState(false);
  const [erragendar, setErrAgendar] = useState(false);
  const [showacepted, setShowAcepted] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmClick = () => {
    setShowConfirmation(true); 
  };

    const handleConfirm = async () => {
      setShowConfirmation(false);
    
      const { name_user, procedure_name, ...filteredFormData } = formData;
      const updatedFormData = {
        ...filteredFormData,
        id_procedure: data.id_procedure,
        institution: data.id_institutions,
      };
    
      try {
        const response = await llamado(updatedFormData, "POST");
    
        if (response.succes) {
          setShowAcepted(
            `SE AGENDO UNA CITA PARA ${data.name_institutions} el dia ${formData.date} a las ${formData.time}`
          );
          setAgendar(true);
        } else {
          setErrAgendar(true);
        }
      } catch (error) {
        console.error("Error al agendar la cita:", error);
        setErrAgendar(true);
      }
    };

    const handleCancel = () => {
      setShowConfirmation(false); 
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await llamadowithoutbody("GET");
        setUserData(userDataResponse);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };
    fetchData();
    return () => {
      setUserData(null);
    };
  }, [data.pi_user]);

  return (
    <div className={styles.citaContainer}>
      <div className={styles.infoCitaContainer}>
        <div className={styles.nameContainer}>
          <TextInputIcon
            type="text"
            name="name_user"
            placeholder={
              userData ? `${userData[0].name} ${userData[0].lastname}` : ""
            }
            value={
              userData ? `${userData[0].name} ${userData[0].lastname}` : ""
            }
            onChange={handleChange}
            icon={faUser}
            readOnly={true}
          />
        </div>

        <div className={styles.procedureContainer}>
          <TextInputIcon
            type="text"
            name="procedure_name"
            placeholder={data.name_procedure}
            value={data.name_procedure}
            onChange={handleChange}
            icon={faFile}
            readOnly={true}
          />
        </div>

        <div className={styles.horaContainer}>
          <TextInputIcon
            type="time"
            name="time"
            placeholder="Ingrese la hora"
            value={formData.time}
            onChange={handleChange}
            icon={faClock}
          />
        </div>

        <div className={styles.fechaContainer}>
          <TextInputIcon
            type="date"
            name="date"
            placeholder="Ingrese la fecha"
            value={formData.date}
            onChange={handleChange}
            icon={faCalendar}
          />
        </div>
      </div>

      <div className={styles.buttonCitaContainer}>
        <Button onClick={handleConfirmClick} buttonText="Agendar Cita" />
      </div>

      <PopUpConfirmation
        message="¿Desea agendar la cita?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isVisible={showConfirmation}
      />
      <PopUpAgendar
        activar={agendar}
        setActivar={setAgendar}
        description={showacepted}
      />
      <PopUpAgendarError activar={erragendar} setActivar={setErrAgendar} />
    </div>
  );
};

export default Cita;
