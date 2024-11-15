import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import styles from "./DropDownCustom.module.css";

const Dropdowncustom = ({ nombre, lista, onChange }) => {
  const [dropdown, setDropdown] = useState(false);
  const [tituloSeleccionado, setTituloSeleccionado] = useState(nombre);

  const abrirCerrar = () => {
    setDropdown(!dropdown);
  };

  const seleccionarItem = (item) => {
    setTituloSeleccionado(item);
    onChange(item);
    setDropdown(false); // Cerrar el Dropdown después de seleccionar un item
  };

  return (
    <div className={styles["dropdown-container"]}>
      <Dropdown isOpen={dropdown} toggle={abrirCerrar}>
        <DropdownToggle className={styles["dropdown-toggle"]}>
          {tituloSeleccionado}
        </DropdownToggle>
        {lista.length > 0 && (
          <DropdownMenu className={styles["dropdown-menu"]}>
            {lista.map((item, index) => (
              <DropdownItem key={index} onClick={() => seleccionarItem(item)}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
    </div>
  );
};

export default Dropdowncustom;
