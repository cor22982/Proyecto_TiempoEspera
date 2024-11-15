import { render, screen, fireEvent } from "@testing-library/react";
import InsttutionComponent from "./InstitutionCard";
import { expect } from "vitest";
import DefaultImage from "@assets/default_institution.jpeg";

describe("Componente InsttutionComponent", () => {
  const mockProps = {
    name: "Instituto ABC",
    image: "image1.jpg",
    onClick: vi.fn(),
    tiempo: "15 minutos",
    procedimiento: "Consulta",
  };

  beforeEach(() => {
    mockProps.onClick.mockClear(); // Asegúrate de limpiar los mocks antes de cada test
  });

  it("debería renderizar el nombre de la institución", () => {
    render(<InsttutionComponent {...mockProps} />);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  it("debería renderizar el procedimiento", () => {
    render(<InsttutionComponent {...mockProps} />);
    expect(screen.getByText(mockProps.procedimiento)).toBeInTheDocument();
  });

  it("debería renderizar el tiempo promedio", () => {
    render(<InsttutionComponent {...mockProps} />);
    expect(screen.getByText("Tiempo Promedio")).toBeInTheDocument();
    expect(screen.getByText(mockProps.tiempo)).toBeInTheDocument();
  });

  it("debería renderizar la imagen de la institución", () => {
    render(<InsttutionComponent {...mockProps} />);
    const image = screen.getByAltText("institution");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.image);
  });

  it("debería llamar a onClick una sola vez cuando se hace clic en la imagen", () => {
    render(<InsttutionComponent {...mockProps} />);
    const image = screen.getByAltText("institution");
    fireEvent.click(image);
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("debería llamar a onClick una sola vez cuando se hace clic en el contenedor", () => {
    render(<InsttutionComponent {...mockProps} />);
    const container = screen.getByText(mockProps.name).closest("div");
    fireEvent.click(container);
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("debería mostrar imagen de respaldo si falla la carga de la imagen", () => {
    render(<InsttutionComponent {...mockProps} />);
    const image = screen.getByAltText("institution");
    fireEvent.error(image); // Simula un error en la carga de imagen
    expect(image).toHaveAttribute("src", DefaultImage);
  });
});
