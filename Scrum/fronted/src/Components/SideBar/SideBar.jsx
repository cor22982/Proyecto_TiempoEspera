import React from "react";
import {
  faArrowLeft,
  faArrowRight,
  faUser,
  faHome,
  faSave,
  faGear,
  faBell,
  faRightFromBracket,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SideBar.module.css";

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  linksArray,
  secondarylinksArray,
  handleMenuClick,
}) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`${styles.container} ${
        !sidebarOpen ? styles.sidebarCollapsed : ""
      }`}
    >
      <button className={styles.sidebarButton} onClick={ModSidebaropen}>
        <FontAwesomeIcon icon={sidebarOpen ? faArrowLeft : faArrowRight} />
      </button>
      <div
        className={`${styles.logoContent} ${
          !sidebarOpen ? styles.logoCollapsed : ""
        }`}
      >
        <div className={styles.imgContent}>
          <img
            src="../../src/assets/Login/logotipo.png"
            className="imagen-portada"
            alt="Logotipo"
          />
        </div>
      </div>
      {linksArray.map(({ icon, label, to }) => (
        <div
          className={styles.linkContainer}
          key={label}
          onClick={() => handleMenuClick(to)}
        >
          <div className={styles.linkIcon}>
            <FontAwesomeIcon icon={icon} />
          </div>
          {sidebarOpen && <span>{label}</span>}
        </div>
      ))}
      <div className={styles.divider} />
      {secondarylinksArray.map(({ icon, label, to }) => (
        <div
          className={styles.linkContainer}
          key={label}
          onClick={() => handleMenuClick(to)}
        >
          <div className={styles.linkIcon}>
            <FontAwesomeIcon icon={icon} />
          </div>
          {sidebarOpen && <span>{label}</span>}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
