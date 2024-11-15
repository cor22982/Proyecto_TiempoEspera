import { render, screen, fireEvent } from "@testing-library/react";
import PopUpConfirmation from "./PopUpConfirmation";
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

describe("PopUpConfirmation Component", () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    mockOnConfirm.mockClear();
    mockOnCancel.mockClear();
  });

  test("debería renderizar el PopUp cuando `isVisible` es `true`", () => {
    render(
      <PopUpConfirmation
        isVisible={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Verificar que el PopUp y el mensaje principal se muestren
    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(screen.getByText("¿Desea agendar la cita?")).toBeInTheDocument();
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  test("no debería renderizar el PopUp cuando `isVisible` es `false`", () => {
    render(
      <PopUpConfirmation
        isVisible={false}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Verificar que el PopUp no esté presente
    expect(screen.queryByTestId("popup")).not.toBeInTheDocument();
  });

  test("debería llamar a `onConfirm` cuando se hace clic en el botón 'Aceptar'", () => {
    render(
      <PopUpConfirmation
        isVisible={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Simular clic en el botón de aceptar
    fireEvent.click(screen.getByText("Aceptar"));

    // Verificar que se haya llamado a `onConfirm`
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test("debería llamar a `onCancel` cuando se hace clic en el botón 'Cancelar'", () => {
    render(
      <PopUpConfirmation
        isVisible={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Simular clic en el botón de cancelar
    fireEvent.click(screen.getByText("Cancelar"));

    // Verificar que se haya llamado a `onCancel`
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test("debería cerrar el PopUp al hacer clic en el botón de cierre del PopUp", () => {
    render(
      <PopUpConfirmation
        isVisible={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Simular clic en el botón de cierre del PopUp
    fireEvent.click(screen.getByText("Cerrar PopUp"));

    // Verificar que se haya llamado a `onCancel` para cerrar el PopUp
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
