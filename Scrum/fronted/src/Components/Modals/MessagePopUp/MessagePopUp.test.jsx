import { render, screen, fireEvent } from "@testing-library/react";
import PopUp from "./MessagePopUp";

describe("PopUp Component", () => {
  const mockSetTrigger = vi.fn();

  beforeEach(() => {
    mockSetTrigger.mockClear();
  });

  test("debería renderizar el pop-up cuando `trigger` es `true`", () => {
    render(
      <PopUp trigger={true} setTrigger={mockSetTrigger}>
        <p>Contenido del PopUp</p>
      </PopUp>
    );

    const popup = screen.getByText("Contenido del PopUp");
    expect(popup).toBeInTheDocument();
    const closeButton = screen.getByRole("button", { name: /x/i });
    expect(closeButton).toBeInTheDocument();
  });

  test("no debería renderizar el pop-up cuando `trigger` es `false`", () => {
    render(
      <PopUp trigger={false} setTrigger={mockSetTrigger}>
        <p>Contenido del PopUp</p>
      </PopUp>
    );

    const popup = screen.queryByText("Contenido del PopUp");
    expect(popup).not.toBeInTheDocument();
  });

  test("debería mostrar el contenido pasado como `children`", () => {
    render(
      <PopUp trigger={true} setTrigger={mockSetTrigger}>
        <p>Contenido del PopUp</p>
      </PopUp>
    );

    const popupContent = screen.getByText("Contenido del PopUp");
    expect(popupContent).toBeInTheDocument();
  });

  test("debería cerrar el pop-up cuando se hace clic en el botón de cerrar", () => {
    render(
      <PopUp trigger={true} setTrigger={mockSetTrigger}>
        <p>Contenido del PopUp</p>
      </PopUp>
    );

    const closeButton = screen.getByRole("button", { name: /x/i });
    fireEvent.click(closeButton);

    expect(mockSetTrigger).toHaveBeenCalledWith(false);
    expect(mockSetTrigger).toHaveBeenCalledTimes(1);
  });
});
