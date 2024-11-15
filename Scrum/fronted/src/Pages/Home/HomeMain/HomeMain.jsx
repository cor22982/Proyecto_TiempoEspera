import styles from "./HomeMain.module.css"; // Importar como CSS Modules
import Principal from "@pages/Home/HomeSearch/HomeSearch";
import useApi from "@hooks/api/useApi";
import { useState, useEffect } from "react";
import Informacion from "@pages/Institution/InstitutionRoutes";
import SearchInput from "@components/Inputs/SearchInput/SearchInput";
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

  // Estado para manejar los trámites sugeridos dinámicamente
  const [sugerenciasTramites, setSugerenciasTramites] = useState([]);

  // Estado para manejar la notificación de "no hay resultados"
  const [noResultados, setNoResultados] = useState(false);

  useEffect(() => {
    // Fetch dinámico para obtener los trámites desde el endpoint
    const fetchTramites = async () => {
      try {
        const response = await fetch(
          "https://deimoss.web05.lol/all_procedures"
        );
        const data = await response.json();

        // Extraer solo el 'name' de cada trámite y actualizar el estado
        const tramitesNames = data.map((procedimiento) => procedimiento.name);
        setSugerenciasTramites(tramitesNames);
      } catch (error) {
        console.error("Error al obtener los trámites:", error);
      }
    };

    fetchTramites(); // Llamar a la función para obtener los trámites
  }, []); // Solo se ejecuta una vez al montar el componente

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

      // Si no hay resultados, se establece noResultados como true
      if (response.length === 0) {
        setNoResultados(true);
      } else {
        setNoResultados(false);
      }

      setDatos(response);
      setSeeScren(true);
      console.log("Nuevo estado de `datos` después de setDatos:", response);
    } catch (e) {
      console.log("Error en la solicitud:", e);
      setDatos([]);
      setNoResultados(true); // En caso de error también mostramos el mensaje de no resultados
    }
  };

  return (
    <div className={styles.contenido}>
      <div className={styles.cabecera}>
        <SearchInput
          icono={faSearch}
          placeholder="Buscar tramite"
          value={busqueda}
          onChange={(value) => setBusqueda(value)}
          onpressenter={fetchData}
          suggestions={sugerenciasTramites}
        />
      </div>

      <div className={styles.paginas}>
        {/* Mostrar mensaje de no resultados si es necesario */}
        {noResultados ? (
          <div className={styles.noResultsMessage}>
            <p>No se encontraron resultados para "{busqueda}"</p>
          </div>
        ) : (
          <>
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
                <div className={styles.tramitesContainer}>
                  <h1>Trámites más comunes</h1>
                  <div className={styles.tramitesGrid}>
                    <div
                      className={`${styles.boxSearch} ${styles.red}`}
                      onClick={() => setBusqueda("Cita controlada")}
                    >
                      <span>Cita controlada</span>
                    </div>
                    <div
                      className={`${styles.boxSearch} ${styles.blue}`}
                      onClick={() =>
                        setBusqueda("Solicitud Electrónica de NIT")
                      }
                    >
                      <span>Solicitud Electrónica de NIT</span>
                    </div>
                    <div
                      className={`${styles.boxSearch} ${styles.yellow}`}
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
                      className={`${styles.boxSearch} ${styles.green}`}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Page_Main;
