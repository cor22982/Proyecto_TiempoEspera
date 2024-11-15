import PopUp from "@components/Modals/MessagePopUp/MessagePopUp";

const PopUpDeleteAppointment = ({ activar, setActivar, description }) => {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>
          Tu reserva ha sido eliminada correctamente.
        </h2>
        <p style={{ fontSize: "20px" }}>{description}</p>
      </div>
    </PopUp>
  );
};

export default PopUpDeleteAppointment;
