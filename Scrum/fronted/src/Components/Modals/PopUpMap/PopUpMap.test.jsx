import { render, screen, fireEvent } from "@testing-library/react";
import PopUpMap from "./PopUpMap";
import MapView from "@components/UI/InteractiveMap/InteractiveMap";
import { vi } from "vitest";

// Mock del componente PopUp
vi.mock("@components/Modals/MessagePopUp/MessagePopUp", () => ({
  default: ({ trigger, setTrigger, children }) =>
    trigger ? (
      <div data-testid="popup">
        <button onClick={() => setTrigger(false)}>Cerrar</button>
        {children}
      </div>
    ) : null,
}));

// Mock del componente MapView
vi.mock("@components/UI/InteractiveMap/InteractiveMap", () => ({
  default: ({ position }) => (
    <div data-testid="map">
      Mapa en posición:{" "}
      {position ? `${position.lat}, ${position.lng}` : "sin posición"}
    </div>
  ),
}));

describe("PopUpMap Component", () => {
  const mockSetActivar = vi.fn();
  const mockPosition = { lat: 40.7128, lng: -74.006 };

  beforeEach(() => {
    mockSetActivar.mockClear();
  });

  test("debería renderizar el PopUp y el mapa cuando `activar` es `true`", () => {
    render(
      <PopUpMap activar={true} setActivar={mockSetActivar} pos={mockPosition} />
    );

    // Verificar que el PopUp esté presente
    expect(screen.getByTestId("popup")).toBeInTheDocument();

    // Verificar que el mapa esté presente y tenga la posición correcta
    expect(screen.getByTestId("map")).toBeInTheDocument();
    expect(
      screen.getByText(
        `Mapa en posición: ${mockPosition.lat}, ${mockPosition.lng}`
      )
    ).toBeInTheDocument();
  });

  test("no debería renderizar el PopUp ni el mapa cuando `activar` es `false`", () => {
    render(
      <PopUpMap
        activar={false}
        setActivar={mockSetActivar}
        pos={mockPosition}
      />
    );

    // Asegurarse de que el PopUp y el mapa no estén presentes
    expect(screen.queryByTestId("popup")).not.toBeInTheDocument();
    expect(screen.queryByTestId("map")).not.toBeInTheDocument();
  });

  test("debería cerrar el PopUp al hacer clic en el botón de cerrar", () => {
    render(
      <PopUpMap activar={true} setActivar={mockSetActivar} pos={mockPosition} />
    );

    // Hacer clic en el botón de cerrar
    const closeButton = screen.getByText("Cerrar");
    fireEvent.click(closeButton);

    // Verificar que `setActivar` se llame con `false`
    expect(mockSetActivar).toHaveBeenCalledWith(false);
  });
});
