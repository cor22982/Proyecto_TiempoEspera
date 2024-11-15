import { render, screen, fireEvent } from "@testing-library/react";
import PopUpAgendarError from "./PopUpAgendarError";
import { vi } from "vitest";

// Mock del componente PopUp
vi.mock("@components/Modals/MessagePopUp/MessagePopUp", () => ({
  default: ({ trigger, setTrigger, children }) =>
    trigger ? (
      <div data-testid="popup">
        <button onClick={() => setTrigger(false)}>Cerrar PopUp</button>
        {children}
      </div>
    ) : null,
}));

describe("PopUpAgendarError Component", () => {
  const mockSetActivar = vi.fn();

  beforeEach(() => {
    mockSetActivar.mockClear();
  });

  test("debería renderizar el PopUp cuando `activar` es `true`", () => {
    render(<PopUpAgendarError activar={true} setActivar={mockSetActivar} />);

    // Verificar que el PopUp se muestre con el mensaje de error y el icono de exclamación
    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(screen.getByText("ERROR AL AGENDAR")).toBeInTheDocument();
    expect(
      screen.getByText("No se pudo agendar la cita ocurrio un error")
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); // Verifica el ícono
  });

  test("no debería renderizar el PopUp cuando `activar` es `false`", () => {
    render(<PopUpAgendarError activar={false} setActivar={mockSetActivar} />);

    // Verificar que el PopUp no esté presente
    expect(screen.queryByTestId("popup")).not.toBeInTheDocument();
  });

  test("debería mostrar el mensaje de error correctamente", () => {
    render(<PopUpAgendarError activar={true} setActivar={mockSetActivar} />);

    // Verificar que el mensaje de error se muestre correctamente
    expect(
      screen.getByText("No se pudo agendar la cita ocurrio un error")
    ).toBeInTheDocument();
  });

  test("debería cerrar el PopUp al hacer clic en el botón de cierre", () => {
    render(<PopUpAgendarError activar={true} setActivar={mockSetActivar} />);

    // Simular clic en el botón de cierre
    fireEvent.click(screen.getByText("Cerrar PopUp"));

    // Verificar que `setActivar` se haya llamado para cerrar el PopUp
    expect(mockSetActivar).toHaveBeenCalledWith(false);
  });
});
