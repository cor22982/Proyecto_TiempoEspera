import PopUp from "@components/Modals/MessagePopUp/MessagePopUp";

const PopUpConfirmation = ({ onConfirm, onCancel, isVisible }) => {
  return (
    <PopUp trigger={isVisible} setTrigger={onCancel}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>¿Desea agendar la cita?</h2>
        <div style={{ marginTop: "20px", display: "flex", gap: "1rem" }}>
          <button
            onClick={onConfirm}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#03B100",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#028a00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#03B100")}
          >
            Aceptar
          </button>
          <button
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#FF6F61",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e04d3d")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FF6F61")}
          >
            Cancelar
          </button>
        </div>
      </div>
    </PopUp>
  );
};

export default PopUpConfirmation;
