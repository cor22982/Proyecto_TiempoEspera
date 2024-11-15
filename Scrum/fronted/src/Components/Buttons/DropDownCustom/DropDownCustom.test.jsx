import { render, screen, fireEvent, act } from "@testing-library/react";
import Dropdowncustom from "./DropDownCustom";
import { expect, vi } from "vitest";

describe("Componente Dropdowncustom", () => {
  it("debería renderizarse con el nombre inicial", () => {
    render(
      <Dropdowncustom
        nombre="Selecciona un elemento"
        lista={["Opción 1", "Opción 2"]}
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Selecciona un elemento")).toBeInTheDocument();
  });

  it("debería mostrar el menú desplegable al hacer clic en el toggle", () => {
    render(
      <Dropdowncustom
        nombre="Selecciona un elemento"
        lista={["Opción 1", "Opción 2"]}
        onChange={() => {}}
      />
    );

    const toggleButton = screen.getByText("Selecciona un elemento");
    act(() => {
      fireEvent.click(toggleButton);
    });

    // Verifica que el menú esté visible
    const menu = screen.queryByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(menu).toBeVisible();
  });

  it("debería cerrar el menú desplegable al seleccionar un elemento y actualizar el título", () => {
    const mockOnChange = vi.fn();
    render(
      <Dropdowncustom
        nombre="Selecciona un elemento"
        lista={["Opción 1", "Opción 2"]}
        onChange={mockOnChange}
      />
    );

    const toggleButton = screen.getByText("Selecciona un elemento");
    act(() => {
      fireEvent.click(toggleButton); // Abre el menú desplegable
    });

    const option1 = screen.getAllByRole("menuitem")[0]; // Selecciona el primer elemento del menú
    act(() => {
      fireEvent.click(option1);
    });

    // Verifica que el menú esté cerrado
    const menu = screen.queryByRole("menu");
    if (menu) {
      expect(menu).not.toBeVisible();
    }

    // Verifica que el título del toggle se actualice con el elemento seleccionado usando `getByRole`
    expect(
      screen.getByRole("button", { name: "Opción 1" })
    ).toBeInTheDocument();

    // Verifica que onChange se llame con el valor seleccionado
    expect(mockOnChange).toHaveBeenCalledWith("Opción 1");
  });

  it("debería alternar la visibilidad del menú desplegable al hacer clic en el toggle varias veces", () => {
    render(
      <Dropdowncustom
        nombre="Selecciona un elemento"
        lista={["Opción 1", "Opción 2"]}
        onChange={() => {}}
      />
    );

    const toggleButton = screen.getByText("Selecciona un elemento");

    // Primer clic - abre el menú
    act(() => {
      fireEvent.click(toggleButton);
    });
    const menu = screen.queryByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(menu).toBeVisible();

    // Segundo clic - cierra el menú
    act(() => {
      fireEvent.click(toggleButton);
    });
    if (menu) {
      expect(menu).not.toBeVisible();
    }
  });

  it("debería no mostrar el menú si la lista está vacía", () => {
    render(
      <Dropdowncustom
        nombre="Selecciona un elemento"
        lista={[]}
        onChange={() => {}}
      />
    );

    const toggleButton = screen.getByText("Selecciona un elemento");

    // Intenta abrir el menú
    act(() => {
      fireEvent.click(toggleButton);
    });

    // Verifica que no haya opciones en el menú
    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("debería manejar múltiples clics rápidos en el toggle sin errores", () => {
    render(
      <Dropdowncustom
        nombre="Selecciona un elemento"
        lista={["Opción 1", "Opción 2"]}
        onChange={() => {}}
      />
    );

    const toggleButton = screen.getByText("Selecciona un elemento");

    // Simula varios clics rápidos en el botón toggle
    act(() => {
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
    });

    // Verifica que el estado final sea consistente (menú visible o no)
    const menu = screen.queryByRole("menu");
    if (menu) {
      expect(menu).toBeVisible();
    } else {
      expect(menu).not.toBeVisible();
    }
  });
});
