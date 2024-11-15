import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Principal from "./HomeSearch";
import InsttutionComponent from "@components/Cards/InstitutionCard/InstitutionCard";

// Mock de InsttutionComponent para evitar pruebas de componentes hijos
vi.mock("@components/Cards/InstitutionCard/InstitutionCard", () => ({
  __esModule: true,
  default: ({ name, procedimiento, image, onClick, tiempo }) => (
    <div onClick={onClick} data-testid="institution-card">
      <h2>{name}</h2>
      <p>{procedimiento}</p>
      <img src={image} alt="institution" />
      <span>{tiempo}</span>
    </div>
  ),
}));

describe("Principal Component", () => {
  const mockIra = vi.fn();
  const mockSetObj = vi.fn();
  const mockPi = "12345";

  const datos = [
    {
      id_institutions: 1,
      id_procedure: 101,
      name: "Institution A",
      name_procedure: "Procedure A",
      imagen: "image1.png",
      procedure_url: "https://example.com/1",
    },
    {
      id_institutions: 2,
      id_procedure: 102,
      name: "Institution B",
      name_procedure: "Procedure B",
      imagen: "image2.png",
      procedure_url: "https://example.com/2",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("debe renderizar los InstitutionComponent con los datos proporcionados", () => {
    render(
      <Principal ira={mockIra} datos={datos} setobj={mockSetObj} pi={mockPi} />
    );

    // Verificar que cada institución está renderizada
    expect(screen.getByText("Institution A")).toBeInTheDocument();
    expect(screen.getByText("Institution B")).toBeInTheDocument();
  });

  test("debe llamar la función onclick con los parámetros correctos cuando se hace clic en un card", () => {
    render(
      <Principal ira={mockIra} datos={datos} setobj={mockSetObj} pi={mockPi} />
    );

    const card = screen.getAllByTestId("institution-card")[0]; // Primera tarjeta

    fireEvent.click(card);

    // Verificar que la función `onclick` fue llamada con los parámetros correctos
    expect(mockIra).toHaveBeenCalledWith(false);
    expect(mockSetObj).toHaveBeenCalledWith({
      id_institutions: 1,
      id_procedure: 101,
      name_institutions: "Institution A",
      name_procedure: "Procedure A",
      pi_user: mockPi,
      url: "https://example.com/1",
    });
  });

  test("debe manejar correctamente los clics en cada card y actualizar el estado correctamente", () => {
    render(
      <Principal ira={mockIra} datos={datos} setobj={mockSetObj} pi={mockPi} />
    );

    const cardA = screen.getAllByTestId("institution-card")[0];
    const cardB = screen.getAllByTestId("institution-card")[1];

    // Simulamos un clic en el primer card
    fireEvent.click(cardA);
    expect(mockSetObj).toHaveBeenCalledWith({
      id_institutions: 1,
      id_procedure: 101,
      name_institutions: "Institution A",
      name_procedure: "Procedure A",
      pi_user: mockPi,
      url: "https://example.com/1",
    });

    // Simulamos un clic en el segundo card
    fireEvent.click(cardB);
    expect(mockSetObj).toHaveBeenCalledWith({
      id_institutions: 2,
      id_procedure: 102,
      name_institutions: "Institution B",
      name_procedure: "Procedure B",
      pi_user: mockPi,
      url: "https://example.com/2",
    });
  });
});
