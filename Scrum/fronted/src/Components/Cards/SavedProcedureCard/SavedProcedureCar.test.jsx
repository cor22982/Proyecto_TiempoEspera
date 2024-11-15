import { render, screen, fireEvent } from "@testing-library/react";
import SavedComponent from "./SavedProcedureCard";
import { vi } from "vitest";
import ImageDefault from "@assets/default_institution.jpeg";

describe("SavedComponent", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("debería llamar a la función de clic solo una vez cuando se hagan múltiples clics rápidos", () => {
    const mockFuntion = vi.fn();
    render(
      <SavedComponent
        image="https://example.com/image.jpg"
        title="Título de prueba"
        description="Descripción de prueba"
        funtion={mockFuntion}
      />
    );

    const containerElement = screen.getByRole("button");

    // Simula múltiples clics rápidos
    fireEvent.click(containerElement);
    fireEvent.click(containerElement);
    fireEvent.click(containerElement);

    // Avanza el tiempo para que el debounce entre en efecto
    vi.advanceTimersByTime(300);

    // Verifica que solo se haya llamado una vez
    expect(mockFuntion).toHaveBeenCalledTimes(1);
  });

  it("debería renderizar el título, descripción e imagen correctamente", () => {
    const mockProps = {
      image: "https://example.com/image.jpg",
      title: "Título de prueba",
      description: "Descripción de prueba",
      funtion: vi.fn(),
    };

    render(<SavedComponent {...mockProps} />);

    expect(screen.getByText("Título de prueba")).toBeInTheDocument();
    expect(screen.getByText("Descripción de prueba")).toBeInTheDocument();

    const imageElement = screen.getByAltText("Institution");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", mockProps.image);
  });

  it("debería llamar a la función al hacer clic en el contenedor", () => {
    const mockFuntion = vi.fn();
    render(
      <SavedComponent
        image="https://example.com/image.jpg"
        title="Título de prueba"
        description="Descripción de prueba"
        funtion={mockFuntion}
      />
    );

    const containerElement = screen.getByRole("button");

    // Simula clic y avanza el tiempo para que el debounce entre en efecto
    fireEvent.click(containerElement);
    vi.advanceTimersByTime(300); // debounce activado

    expect(mockFuntion).toHaveBeenCalledTimes(1);
  });

  it("debería mostrar una imagen de respaldo si la imagen falla en cargar", () => {
    const mockProps = {
      image: "https://example.com/invalid-image.jpg",
      title: "Título de prueba",
      description: "Descripción de prueba",
      funtion: vi.fn(),
    };

    render(<SavedComponent {...mockProps} />);
    const imageElement = screen.getByAltText("Institution");

    fireEvent.error(imageElement);

    expect(imageElement).toHaveAttribute("src", ImageDefault);
  });
});
