import PopUp from "@components/Modals/MessagePopUp";
function PopUpSave({
  activar,
  setActivar,
  nombre,
  description,
  image,
  address,
}) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>{nombre}</h2>
        <img
          src={image}
          style={{ width: "500px", height: "200px", objectFit: "fill" }}
        ></img>
        <p style={{ fontSize: "20px", display: "flex" }}>{description}</p>
        <p style={{ fontSize: "20px", display: "flex" }}>{address}</p>
      </div>
    </PopUp>
  );
}

export default PopUpSave;
