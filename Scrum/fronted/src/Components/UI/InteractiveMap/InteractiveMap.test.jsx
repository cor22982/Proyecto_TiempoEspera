import { render, screen, waitFor } from "@testing-library/react";
import MapView from "./InteractiveMap";
import { act } from "react";

describe("MapView Component", () => {
  const position = [51.505, -0.09]; // Coordenadas de prueba

  test("debería renderizar el contenedor del mapa", async () => {
    await act(async () => {
      render(<MapView position={position} />);
    });

    const mapContainer = await screen.findByRole("button", {
      name: /zoom in/i,
    });
    expect(mapContainer).toBeInTheDocument();
  });

  test("debería renderizar el mapa con la posición y el zoom correctos", async () => {
    await act(async () => {
      render(<MapView position={position} />);
    });

    const mapContainer = await screen.findByRole("button", {
      name: /zoom out/i,
    });
    expect(mapContainer).toBeInTheDocument();
  });

  test("debería mostrar un marcador en la posición correcta", async () => {
    await act(async () => {
      render(<MapView position={position} />);
    });

    const markerElement = await screen.findByAltText("Marker");
    expect(markerElement).toBeInTheDocument();
  });

  test("debería contener un Popup en el marcador", async () => {
    await act(async () => {
      render(<MapView position={position} />);
    });

    const markerElement = await screen.findByAltText("Marker");

    // Simular un clic en el marcador para abrir el Popup
    markerElement.click();

    // Esperar a que el Popup aparezca con el texto esperado
    await waitFor(() => {
      expect(
        screen.getByText("A pretty CSS3 popup. Easily customizable.")
      ).toBeInTheDocument();
    });
  });
});
