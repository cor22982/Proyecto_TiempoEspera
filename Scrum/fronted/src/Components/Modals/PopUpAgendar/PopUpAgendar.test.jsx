import { render, screen, fireEvent } from "@testing-library/react";
import PopUpAgendar from "./PopUpAgendar";
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

describe("PopUpAgendar Component", () => {
  const mockSetActivar = vi.fn();

  beforeEach(() => {
    mockSetActivar.mockClear();
  });

  test("debería renderizar el PopUp cuando `activar` es `true`", () => {
    render(
      <PopUpAgendar
        activar={true}
        setActivar={mockSetActivar}
        description="Esta es una cita agendada con éxito"
      />
    );

    // Verificar que el PopUp se muestre con el mensaje y el icono de confirmación
    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(screen.getByText("CITA AGENDADA EXITOSAMENTE")).toBeInTheDocument();
    expect(
      screen.getByText("Esta es una cita agendada con éxito")
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); // Verifica el ícono
  });

  test("no debería renderizar el PopUp cuando `activar` es `false`", () => {
    render(
      <PopUpAgendar
        activar={false}
        setActivar={mockSetActivar}
        description="Esta es una cita agendada con éxito"
      />
    );

    // Verificar que el PopUp no esté presente
    expect(screen.queryByTestId("popup")).not.toBeInTheDocument();
  });

  test("debería mostrar el mensaje de descripción proporcionado", () => {
    const testDescription = "Cita agendada para el próximo lunes";
    render(
      <PopUpAgendar
        activar={true}
        setActivar={mockSetActivar}
        description={testDescription}
      />
    );

    // Verificar que el mensaje de descripción se muestre correctamente
    expect(screen.getByText(testDescription)).toBeInTheDocument();
  });

  test("debería cerrar el PopUp al hacer clic en el botón de cierre", () => {
    render(
      <PopUpAgendar
        activar={true}
        setActivar={mockSetActivar}
        description="Esta es una cita agendada con éxito"
      />
    );

    // Simular clic en el botón de cierre
    fireEvent.click(screen.getByText("Cerrar PopUp"));

    // Verificar que `setActivar` se haya llamado para cerrar el PopUp
    expect(mockSetActivar).toHaveBeenCalledWith(false);
  });
});
