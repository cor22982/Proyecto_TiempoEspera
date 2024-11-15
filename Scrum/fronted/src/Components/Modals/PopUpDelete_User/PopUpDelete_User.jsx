import PopUp from "@components/Modals/MessagePopUp/MessagePopUp";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PopUpDelete_User = ({ activar, setActivar }) => {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Se elimino un usuario con Exito</h2>
        <p style={{ fontSize: "20px", display: "flex" }}>
          Acaba de eliminar al usuario en la base de datos
        </p>
        <div style={{ color: "red", fontSize: "30px" }}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </div>
      </div>
    </PopUp>
  );
};
export default PopUpDelete_User;
