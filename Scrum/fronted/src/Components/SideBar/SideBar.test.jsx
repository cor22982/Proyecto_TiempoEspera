import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./SideBar";
import {
  faUser,
  faHome,
  faGear,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { vi } from "vitest";

describe("Sidebar Component", () => {
  const mockSetSidebarOpen = vi.fn();
  const mockHandleMenuClick = vi.fn();
  const linksArray = [
    { icon: faHome, label: "Inicio", to: "/inicio" },
    { icon: faUser, label: "Perfil", to: "/perfil" },
  ];
  const secondaryLinksArray = [
    { icon: faGear, label: "Configuración", to: "/configuracion" },
    { icon: faBell, label: "Notificaciones", to: "/notificaciones" },
  ];

  beforeEach(() => {
    mockSetSidebarOpen.mockClear();
    mockHandleMenuClick.mockClear();
  });

  test("debería renderizar los enlaces principales y secundarios correctamente", () => {
    render(
      <Sidebar
        sidebarOpen={true}
        setSidebarOpen={mockSetSidebarOpen}
        linksArray={linksArray}
        secondarylinksArray={secondaryLinksArray}
        handleMenuClick={mockHandleMenuClick}
      />
    );

    linksArray.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
    secondaryLinksArray.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  test("debería ejecutar setSidebarOpen al hacer clic en el botón de abrir/cerrar", () => {
    render(
      <Sidebar
        sidebarOpen={true}
        setSidebarOpen={mockSetSidebarOpen}
        linksArray={linksArray}
        secondarylinksArray={secondaryLinksArray}
        handleMenuClick={mockHandleMenuClick}
      />
    );

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    expect(mockSetSidebarOpen).toHaveBeenCalledWith(false);
  });

  test("debería llamar a handleMenuClick con la ruta correcta al hacer clic en un enlace", () => {
    render(
      <Sidebar
        sidebarOpen={true}
        setSidebarOpen={mockSetSidebarOpen}
        linksArray={linksArray}
        secondarylinksArray={secondaryLinksArray}
        handleMenuClick={mockHandleMenuClick}
      />
    );

    const linkToClick = screen.getByText("Inicio");
    fireEvent.click(linkToClick);

    expect(mockHandleMenuClick).toHaveBeenCalledWith("/inicio");
  });

  test("debería ocultar los textos de los enlaces cuando sidebarOpen es false", () => {
    render(
      <Sidebar
        sidebarOpen={false}
        setSidebarOpen={mockSetSidebarOpen}
        linksArray={linksArray}
        secondarylinksArray={secondaryLinksArray}
        handleMenuClick={mockHandleMenuClick}
      />
    );

    linksArray.forEach((link) => {
      expect(screen.queryByText(link.label)).not.toBeInTheDocument();
    });
    secondaryLinksArray.forEach((link) => {
      expect(screen.queryByText(link.label)).not.toBeInTheDocument();
    });
  });
  test("debería cambiar el icono del botón al abrir y cerrar la barra lateral", () => {
    const { rerender } = render(
      <Sidebar
        sidebarOpen={false}
        setSidebarOpen={mockSetSidebarOpen}
        linksArray={linksArray}
        secondarylinksArray={secondaryLinksArray}
        handleMenuClick={mockHandleMenuClick}
      />
    );

    // Verifica que el icono de la flecha apunte a la derecha
    const toggleButtonIcon = screen.getByRole("button").querySelector("svg");
    expect(toggleButtonIcon).toHaveAttribute("data-icon", "arrow-right");

    // Rerenderiza con sidebarOpen como true para verificar el cambio del icono
    rerender(
      <Sidebar
        sidebarOpen={true}
        setSidebarOpen={mockSetSidebarOpen}
        linksArray={linksArray}
        secondarylinksArray={secondaryLinksArray}
        handleMenuClick={mockHandleMenuClick}
      />
    );

    // Verifica que el icono de la flecha cambie a la izquierda
    expect(toggleButtonIcon).toHaveAttribute("data-icon", "arrow-left");
  });

  test("debería mostrar el logo en la barra lateral", () => {
    render(
      <Sidebar
        sidebarOpen={true}
        setSidebarOpen={mockSetSidebarOpen}
        linksArray={linksArray}
        secondarylinksArray={secondaryLinksArray}
        handleMenuClick={mockHandleMenuClick}
      />
    );

    const logo = screen.getByAltText("Logotipo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("imagen-portada");
  });
});
