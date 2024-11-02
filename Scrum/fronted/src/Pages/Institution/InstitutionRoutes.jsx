import "./InstitutionRoutes.css";
import MenuOption from "@components/Navs/TextMenuLink";
import Dashboard from "@pages/Institution/InstitutionInfo/InstitutionDataProvider";
import Comentarios from "@pages/Institution/Comments/Comments";
import Requisitos from "@pages/Institution/Requirements/Requisitos";
import Cita from "@pages/Institution/Appointments/Cita";
import IconButton from "@components/Buttons/IconButton";
import Agendar_E from "@pages/Institution/Agendar_E/Agendar_E";
import { parseJwt } from "@hooks/auth/useToken";
import useToken from "@hooks/auth/useToken";
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Informacion = ({ data, ira }) => {
  const { token } = useToken();
  const rol = parseJwt(token).rol;
  const { name_institutions } = data;
  const [selectedSection, setSelectedSection] = useState("dashboard");

  const renderContent = () => {
    switch (selectedSection) {
      case "dashboard":
        return <Dashboard data={data} />;
      case "comentarios":
        return <Comentarios data={data} />;
      case "requisitos":
        return <Requisitos data={data} />;
      case "agendar":
        return <Cita data={data} />;
      case "agendar_e":
        return <Agendar_E data={data}/>;
      default:
        return <Dashboard data={data} />;
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="contenedor-info">
      <div className="header_institution">
        <IconButton icono={faArrowLeft} onclick={() => ira(true)} />
        <h3 className="titulo-info">{name_institutions}</h3>

        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <IconButton
            icono={faArrowUpRightFromSquare}
            texto="Ver trámite en página oficial"
            onclick={() => openInNewTab(data.url)}
            style={{ marginLeft: "8px" }}
          />
        </div>
      </div>
      <div className="menu-info">
        <MenuOption
          nombre="Información"
          onClick={() => setSelectedSection("dashboard")}
        />
        <MenuOption
          nombre="Comentarios"
          onClick={() => setSelectedSection("comentarios")}
        />
        <MenuOption
          nombre="Requisitos"
          onClick={() => setSelectedSection("requisitos")}
        />
        <MenuOption
          nombre="Agendar"
          onClick={() => setSelectedSection("agendar")}
        />
        {/* Mostrar este menú solo si el rol es 'empleador' */}
        {rol === "empleador" && (
          <MenuOption
            nombre="Agendar Empleador"
            onClick={() => setSelectedSection("agendar_e")}
          />
        )}
      </div>

      <div className="informacion-contenido">{renderContent()}</div>
    </div>
  );
};

export default Informacion;
