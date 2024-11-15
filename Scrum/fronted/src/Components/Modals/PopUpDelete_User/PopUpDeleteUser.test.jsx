import { render, screen, fireEvent } from "@testing-library/react";
import PopUpDelete_User from "./PopUpDelete_User";
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

describe("PopUpDelete_User Component", () => {
  const mockSetActivar = vi.fn();

  beforeEach(() => {
    mockSetActivar.mockClear();
  });

  test("debería renderizar el PopUp cuando `activar` es `true`", () => {
    render(<PopUpDelete_User activar={true} setActivar={mockSetActivar} />);

    // Verificar que el PopUp esté presente
    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(
      screen.getByText("Se elimino un usuario con Exito")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Acaba de eliminar al usuario en la base de datos")
    ).toBeInTheDocument();
  });

  test("no debería renderizar el PopUp cuando `activar` es `false`", () => {
    render(<PopUpDelete_User activar={false} setActivar={mockSetActivar} />);

    // Verificar que el PopUp no esté presente
    expect(screen.queryByTestId("popup")).not.toBeInTheDocument();
  });

  test("debería cerrar el PopUp cuando se hace clic en el botón de cerrar", () => {
    render(<PopUpDelete_User activar={true} setActivar={mockSetActivar} />);

    // Simular clic en el botón de cierre
    fireEvent.click(screen.getByText("Cerrar"));

    // Verificar que se haya llamado a `setActivar` con `false` para cerrar el PopUp
    expect(mockSetActivar).toHaveBeenCalledWith(false);
  });

  test("debería renderizar el ícono de eliminación correctamente", () => {
    render(<PopUpDelete_User activar={true} setActivar={mockSetActivar} />);

    // Verificar que el ícono esté en el documento
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
  });
});
