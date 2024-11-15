import { render, screen, fireEvent } from "@testing-library/react";
import PopUpDeleteAppointment from "./PopUpDelete_Appointment";
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

describe("PopUpDeleteAppointment Component", () => {
  const mockSetActivar = vi.fn();
  const description = "Detalles de la cita eliminada.";

  beforeEach(() => {
    mockSetActivar.mockClear();
  });

  test("debería renderizar el PopUp cuando `activar` es `true`", () => {
    render(
      <PopUpDeleteAppointment
        activar={true}
        setActivar={mockSetActivar}
        description={description}
      />
    );

    // Verificar que el PopUp esté presente
    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(
      screen.getByText("Tu reserva ha sido eliminada correctamente.")
    ).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  test("no debería renderizar el PopUp cuando `activar` es `false`", () => {
    render(
      <PopUpDeleteAppointment
        activar={false}
        setActivar={mockSetActivar}
        description={description}
      />
    );

    // Verificar que el PopUp no esté presente
    expect(screen.queryByTestId("popup")).not.toBeInTheDocument();
  });

  test("debería cerrar el PopUp cuando se hace clic en el botón de cerrar", () => {
    render(
      <PopUpDeleteAppointment
        activar={true}
        setActivar={mockSetActivar}
        description={description}
      />
    );

    // Simular clic en el botón de cierre
    fireEvent.click(screen.getByText("Cerrar"));

    // Verificar que se haya llamado a `setActivar` con `false` para cerrar el PopUp
    expect(mockSetActivar).toHaveBeenCalledWith(false);
  });
});
