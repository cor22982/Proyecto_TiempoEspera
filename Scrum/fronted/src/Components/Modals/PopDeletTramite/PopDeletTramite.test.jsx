import { render, screen, fireEvent } from "@testing-library/react";
import PopDeletTramite from "./PopDeletTramite";
import { vi } from "vitest";

describe("PopDeletTramite Component", () => {
  const mockSetActivar = vi.fn();

  beforeEach(() => {
    mockSetActivar.mockClear();
  });

  test("debería renderizar el PopUp cuando `activar` es `true`", () => {
    render(
      <PopDeletTramite activar={true} setActivar={mockSetActivar} id="1234" />
    );

    const title = screen.getByText("Se elimino el tramite con Exito");
    expect(title).toBeInTheDocument();

    const message = screen.getByText(
      "Acaba de eliminar al tramite 1234 en la base de datos"
    );
    expect(message).toBeInTheDocument();
  });

  test("no debería renderizar el PopUp cuando `activar` es `false`", () => {
    render(
      <PopDeletTramite activar={false} setActivar={mockSetActivar} id="1234" />
    );

    const title = screen.queryByText("Se elimino el tramite con Exito");
    expect(title).not.toBeInTheDocument();
  });

  test("debería mostrar el mensaje con el `id` correcto", () => {
    render(
      <PopDeletTramite activar={true} setActivar={mockSetActivar} id="5678" />
    );

    const message = screen.getByText(
      "Acaba de eliminar al tramite 5678 en la base de datos"
    );
    expect(message).toBeInTheDocument();
  });

  test("debería cerrar el PopUp cuando se hace clic en el botón de cerrar", () => {
    render(
      <PopDeletTramite activar={true} setActivar={mockSetActivar} id="1234" />
    );

    const closeButton = screen.getByRole("button", { name: /x/i });
    fireEvent.click(closeButton);

    expect(mockSetActivar).toHaveBeenCalledWith(false);
    expect(mockSetActivar).toHaveBeenCalledTimes(1);
  });
});
