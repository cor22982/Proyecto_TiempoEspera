import "./HomeMain.css";
import Principal from "@pages/Home/HomeSearch/HomeSearch";
import useApi from "@hooks/api/useApi";
import { useState, useEffect } from "react";
import Informacion from "@pages/Institution/InstitutionRoutes";
import SearchInput from "@components/Inputs/SearchInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Page_Main = ({ pi }) => {
  const [busqueda, setBusqueda] = useState("");
  const [pantalla, setPantalla] = useState(true);
  const { llamadowithoutbody } = useApi(
    `https://deimoss.web05.lol/institutions/${busqueda}`
  );
  const [datos, setDatos] = useState([]);
  const [object_datos, setobject_datos] = useState(null);
  const [seeScreens, setSeeScren] = useState(false);

  const sugerenciasTramites = [
    "Cita controlada",
    "Solicitud Electrónica de NIT",
    "Inscripción NIT sin Obligaciones con invalidez física",
    "Inscripción de sociedad",
    "Renovación de pasaporte",
    "Licencia de conducción",
    "Cambio de nombre",
    "Actualización de cédula",
  ];

  // Usar useEffect para ejecutar fetchData cuando `busqueda` cambie
  useEffect(() => {
    if (busqueda.trim() !== "") {
      fetchData();
    }
  }, [busqueda]);

  const fetchData = async () => {
    const busquedaParseada = busqueda.toLowerCase().replace(/ /g, "%20");
    try {
      const response = await llamadowithoutbody(
        "GET",
        `https://deimoss.web05.lol/institutions/${busquedaParseada}`
      );
      setDatos(response);
      setSeeScren(true);
      console.log("Nuevo estado de `datos` después de setDatos:", response);
    } catch (e) {
      console.log("Error en la solicitud:", e);
      setDatos([]);
    }
  };

  return (
    <div className="contenido">
      <div className="cabecera">
        <SearchInput
          icono={faSearch}
          placeholder="Buscar tramite"
          value={busqueda}
          onChange={(value) => setBusqueda(value)}
          onpressenter={fetchData}
          suggestions={sugerenciasTramites}
        />
      </div>
      <div className="paginas">
        {pantalla ? (
          seeScreens ? (
            <Principal
              ira={setPantalla}
              datos={datos}
              setobj={setobject_datos}
              pi={pi}
              setSearch={setBusqueda}
            />
          ) : (
            <div className="tramites-container">
              <h1>Trámites más comunes</h1>
              <div className="tramites-grid">
                <div
                  className="box-search red"
                  onClick={() => setBusqueda("Cita controlada")}
                >
                  <span>Cita controlada</span>
                </div>
                <div
                  className="box-search blue"
                  onClick={() => setBusqueda("Solicitud Electrónica de NIT")}
                >
                  <span>Solicitud Electrónica de NIT</span>
                </div>
                <div
                  className="box-search yellow"
                  onClick={() =>
                    setBusqueda(
                      "Inscripción NIT sin Obligaciones con invalidez física"
                    )
                  }
                >
                  <span>
                    Inscripción NIT sin Obligaciones con invalidez física
                  </span>
                </div>
                <div
                  className="box-search green"
                  onClick={() => setBusqueda("Inscripción de sociedad")}
                >
                  <span>Inscripción de sociedad</span>
                </div>
              </div>
            </div>
          )
        ) : (
          <Informacion data={object_datos} ira={setPantalla} />
        )}
      </div>
    </div>
  );
};

export default Page_Main;