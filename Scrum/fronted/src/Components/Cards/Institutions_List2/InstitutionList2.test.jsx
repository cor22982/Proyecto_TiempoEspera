import { render, screen, fireEvent } from "@testing-library/react";
import Institutions_List2 from "./Institutions_List2";
import { expect } from "vitest";
import ImageDefault from "@assets/default_institution.jpeg"; // Asegúrate de que la ruta sea correcta

describe("Componente Institutions_List2", () => {
  const mockInstitutions = [
    {
      id_institutions: 1,
      name: "Instituto ABC",
      telefono: "123456789",
      imagen: "image1.jpg",
    },
    {
      id_institutions: 2,
      name: "Centro XYZ",
      telefono: null,
      imagen: null, // Sin imagen
    },
  ];

  it("debería renderizar el nombre de cada institución", () => {
    render(<Institutions_List2 institutions_items={mockInstitutions} />);
    expect(screen.getByText("Instituto ABC")).toBeInTheDocument();
    expect(screen.getByText("Centro XYZ")).toBeInTheDocument();
  });

  it("debería mostrar 'No disponible' para teléfono cuando falta el número", () => {
    render(<Institutions_List2 institutions_items={mockInstitutions} />);
    expect(screen.getByText("Telefono No disponible")).toBeInTheDocument();
  });

  it("debería mostrar el número de teléfono cuando está disponible", () => {
    render(<Institutions_List2 institutions_items={mockInstitutions} />);
    expect(screen.getByText("Telefono 123456789")).toBeInTheDocument();
  });

  it("debería renderizar la imagen de la institución si está disponible", () => {
    render(<Institutions_List2 institutions_items={mockInstitutions} />);
    const institutionWithImage = screen.getByAltText("Instituto ABC");
    expect(institutionWithImage).toBeInTheDocument();
    expect(institutionWithImage).toHaveAttribute("src", "image1.jpg");
  });

  it("debería mostrar la imagen por defecto cuando la imagen es null", () => {
    render(<Institutions_List2 institutions_items={mockInstitutions} />);
    const institutionWithoutImage = screen.getByAltText("Centro XYZ");
    expect(institutionWithoutImage).toBeInTheDocument();
    expect(institutionWithoutImage).toHaveAttribute("src", ImageDefault);
  });

  it("debería mostrar la imagen por defecto si ocurre un error al cargar la imagen", () => {
    render(<Institutions_List2 institutions_items={mockInstitutions} />);
    const institutionWithImageError = screen.getByAltText("Instituto ABC");
    fireEvent.error(institutionWithImageError); // Simula un error en la carga de imagen
    expect(institutionWithImageError).toHaveAttribute("src", ImageDefault);
  });

  it("debería manejar el caso de lista vacía sin errores", () => {
    render(<Institutions_List2 institutions_items={[]} />);
    expect(screen.queryByText(/Instituto/)).not.toBeInTheDocument();
  });
});
