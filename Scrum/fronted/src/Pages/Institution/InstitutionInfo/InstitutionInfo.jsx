import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStarHalfAlt,
  faStar,
  faMapLocation,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";
import styles from "./InstitutionInfo.module.css";
import Imagen from "@components/UI/Image/Image";
import Stats from "@components/UI/AttendanceChart/AttendanceChart";
import MapView from "@components/UI/InteractiveMap/InteractiveMap";
import useApi from "@hooks/api/useApi";
import useToken from "@hooks/auth/useToken";
import PopUpMap from "@components/Modals/PopUpMap/PopUpMap";
import IconButton from "@components/Buttons/IconButton/IconButton";

const Tramite = ({ institucion }) => {
  const [viewMap, setviewMap] = useState(false);
  const showMap = () => {
    setviewMap(true);
  };

  const calcularEstrellas = () => {
    const puntuacionTotal = 5;
    const puntuacionEntera = Math.floor(institucion.puntuacion);
    const puntuacionDecimal = institucion.puntuacion - puntuacionEntera;

    const estrellasEnteras = Array.from(
      { length: puntuacionEntera },
      (_, index) => (
        <FontAwesomeIcon
          key={`full-${index}`}
          className={styles.iconStar}
          icon={faStar}
        />
      )
    );

    if (puntuacionDecimal >= 0.5) {
      estrellasEnteras.push(
        <FontAwesomeIcon
          key={"half"}
          className={styles.iconStar}
          icon={faStarHalfAlt}
        />
      );
    }

    const estrellasRestantes = Array.from(
      { length: puntuacionTotal - estrellasEnteras.length },
      (_, index) => (
        <i
          key={`empty-${index}`}
          className={`far fa-star ${styles.iconStar}`}
        ></i>
      )
    );

    return [...estrellasEnteras, ...estrellasRestantes];
  };

  return (
    <div className={styles.tramiteContainer}>
      <div className={styles.header}>
        <IconButton icono={faMapLocation} texto="VER MAPA" onclick={showMap} />
        <Imagen src={institucion.img} alt="Imagen prueba" />
      </div>
      <div className={styles.puntuacion}>{calcularEstrellas()}</div>
      <div className={styles.identificacion}></div>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <div className={styles.infoTitulo}>Ranking</div>
          <div className={styles.infoDato}>
            <span className={styles.textBold}>
              {Math.floor(institucion.puntuacion)}
            </span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoTitulo}>Tiempo</div>
          <div className={styles.infoDato}>
            <span className={styles.textBold}>{institucion.t_promedio}</span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoTitulo}>Dirección</div>
          <div className={styles.infoDato}>
            <span className={styles.textBold}>{institucion.direccion}</span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoTitulo}>Teléfono</div>
          <div className={styles.infoDato}>
            <span className={styles.textBold}>{institucion.telefono}</span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoTitulo}>Horarios</div>
          <div className={styles.infoDato}>
            <span className={styles.textBold}>{institucion.horario}</span>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statsName}>Flujo de personas</div>
        <Stats datos={institucion.dias} />
      </div>
      <PopUpMap
        activar={viewMap}
        setActivar={setviewMap}
        pos={institucion.mapa}
      />
    </div>
  );
};

export default Tramite;
