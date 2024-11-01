import { useState } from "react";
import "./HomeRoutes.css";
import {
  faUser,
  faHome,
  faSave,
  faGear,
  faBell,
  faRightFromBracket,
  faFire,
  faPeopleArrows,
  faFolder,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import "@assets/Login/logotipo.png";
import Logout from "@pages/Auth/LogOut/LogOut";
import Page_Main from "@pages/Home/HomeMain/HomeMain";
import Guardados from "@pages/User/Saved/Guardados";
import Account from "@pages/User/Account/account";
import Configuration from "@pages/User/Configuration/configuration";
import Sidebar from "@components/SideBar/SideBar";
import { parseJwt } from "@hooks/auth/useToken";
import useToken from "@hooks/auth/useToken";
import Usuarios from "../Admin/Usuarios";
import Tramite from "../Admin/Tramite/Tramite";
import Institutions from "../Admin/Institutions/Institutions";
const Pages = ({ pi }) => {
  const { token } = useToken();
  const rol = parseJwt(token).rol;
  const [selectedView, setSelectedView] = useState("main"); // Controla la vista seleccionada
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleMenuClick = (view) => {
    setSelectedView(view);
  };

  const renderView = () => {
    switch (selectedView) {
      case "main":
        return <Page_Main pi={pi}></Page_Main>;
      case "cuenta":
        return <Account />;
      case "guardados":
        return <Guardados pi={pi} />;
      case "configuracion":
        return <Configuration />;
      case "usuarios":
        return <Usuarios></Usuarios>;
      case "salir":
        return <Logout />;
      case "tramite":
        return <Tramite />;
      case "institutions":
        return <Institutions />;
      default:
        return <Page_Main pi={pi}></Page_Main>;
    }
  };

  const linksArray = [
    {
      label: "Home",
      icon: faHome,
      to: "main",
    },
    {
      label: "Cuenta",
      icon: faUser,
      to: "cuenta",
    },
    {
      label: "Guardados",
      icon: faSave,
      to: "guardados",
    },

  ];

  const linksArray_Admin = [
    {
      label: "Instituciones",
      icon: faBuilding,
      to: "institutions",
    },
    {
      label: "Tramite",
      icon: faFolder,
      to: "tramite",
    },
    {
      label: "Usuarios",
      icon: faPeopleArrows,
      to: "usuarios",
    },
  ];

  if (rol === "empleador") {
    linksArray.push({
      label: "Colaboradores",
      icon: faPeopleArrows,
      to: "recomendados",
    });
  }
  const secondarylinksArray = [
    {
      label: "Configuración",
      icon: faGear,
      to: "configuracion",
    },
    {
      label: "Salir",
      icon: faRightFromBracket,
      to: "salir",
    },
  ];
  return (
    <div
      className={
        sidebarOpen ? "contenedor-principal-activate" : "contenedor-principal"
      }
    >
      <div className="opciones">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          linksArray={rol == "administrador" ? linksArray_Admin : linksArray}
          secondarylinksArray={secondarylinksArray}
          handleMenuClick={handleMenuClick}
        ></Sidebar>
      </div>

      <div className="interfaz">
        {renderView()} {/* Renderiza la vista seleccionada */}
      </div>
    </div>
  );
};

const Recomendados = () => <h1>Contenido de Recomendados</h1>;

export default Pages;
