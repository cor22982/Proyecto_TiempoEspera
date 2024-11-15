import { render, screen, fireEvent } from "@testing-library/react";
import PopUpSave from "./PopUpSave";
import { vi } from "vitest";

// Mock para el componente PopUp
vi.mock("@components/Modals/MessagePopUp/MessagePopUp", () => ({
  default: ({ trigger, setTrigger, children }) =>
    trigger ? (
      <div data-testid="popup">
        <button onClick={() => setTrigger(false)}>Cerrar</button>
        {children}
      </div>
    ) : null,
}));

describe("PopUpSave Component", () => {
  const mockSetActivar = vi.fn();
  const mockProps = {
    activar: true,
    setActivar: mockSetActivar,
    nombre: "Título de Prueba",
    description: "Descripción de prueba",
    image: "http://example.com/image.jpg",
    address: "Dirección de prueba",
  };

  beforeEach(() => {
    mockSetActivar.mockClear();
  });

  test("debería renderizar el PopUp cuando `activar` es `true`", () => {
    render(<PopUpSave {...mockProps} />);

    // Comprobar que el contenido del PopUp está presente
    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(screen.getByText("Título de Prueba")).toBeInTheDocument();
    expect(screen.getByText("Descripción de prueba")).toBeInTheDocument();
    expect(screen.getByText("Dirección de prueba")).toBeInTheDocument();
    const image = screen.getByRole("img", { name: "Imagen" });
    expect(image).toHaveAttribute("src", "http://example.com/image.jpg");
  });

  test("no debería renderizar el PopUp cuando `activar` es `false`", () => {
    render(<PopUpSave {...mockProps} activar={false} />);

    // Asegurarse de que el PopUp no esté presente en el DOM
    expect(screen.queryByTestId("popup")).not.toBeInTheDocument();
  });

  test("debería cerrar el PopUp al hacer clic en el botón de cerrar", () => {
    render(<PopUpSave {...mockProps} />);

    const closeButton = screen.getByText("Cerrar");
    fireEvent.click(closeButton);

    expect(mockSetActivar).toHaveBeenCalledWith(false);
  });

  test("debería mostrar correctamente los datos proporcionados", () => {
    render(<PopUpSave {...mockProps} />);

    expect(screen.getByText("Título de Prueba")).toBeInTheDocument();
    expect(screen.getByText("Descripción de prueba")).toBeInTheDocument();
    expect(screen.getByText("Dirección de prueba")).toBeInTheDocument();
    const image = screen.getByRole("img", { name: "Imagen" });
    expect(image).toHaveAttribute("src", "http://example.com/image.jpg");
  });
});
