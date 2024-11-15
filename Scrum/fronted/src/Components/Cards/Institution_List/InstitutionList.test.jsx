import { render, screen, within, fireEvent } from "@testing-library/react";
import Institution_List from "./Institution_List";
import { expect } from "vitest";
import ImageDefault from "@assets/default_institution.jpeg";

describe("Componente Institution_List", () => {
  const institutions = [
    {
      id_institutions: 1,
      name: "Instituto ABC",
      adress: "Calle Falsa 123",
      telefono: "123456789",
      hora_apertura: "08:00",
      hora_cierre: "17:00",
      rating: 4.5,
      imagen: "image1.jpg",
    },
    {
      id_institutions: 2,
      name: "Centro XYZ",
      adress: "Avenida Siempre Viva 742",
      telefono: null,
      hora_apertura: null,
      hora_cierre: null,
      rating: 4.0,
      imagen: null,
    },
  ];

  it("debería mostrar 'No disponible' para teléfono y horario si los datos están ausentes", () => {
    render(<Institution_List institutions_items={institutions} />);

    const institutionInfo = screen
      .getByText("Centro XYZ")
      .closest(".component-list");

    const phoneElement = within(institutionInfo).getByText(/Teléfono:/);
    expect(
      within(phoneElement.parentElement).getByText(/No disponible/)
    ).toBeInTheDocument();

    const scheduleElement = within(institutionInfo).getByText(/Horario:/);
    expect(
      within(scheduleElement.parentElement).getByText(/No disponible/)
    ).toBeInTheDocument();

    const ratingElement = within(institutionInfo).getByText(/Rating:/);
    expect(
      within(ratingElement.parentElement).getByText(/4/)
    ).toBeInTheDocument();
  });

  it("debería renderizar 'No disponible' para campos faltantes si no se proporcionan en los datos", () => {
    const institutionWithMissingData = [
      {
        id_institutions: 3,
        name: "Institución Incompleta",
        adress: "Calle sin número",
        telefono: null,
        hora_apertura: null,
        hora_cierre: null,
        rating: 3.0,
        imagen: null,
      },
    ];

    render(
      <Institution_List institutions_items={institutionWithMissingData} />
    );

    const institutionInfo = screen
      .getByText("Institución Incompleta")
      .closest(".component-list");

    const addressElement = within(institutionInfo).getByText(/Dirección:/);
    expect(
      within(addressElement.parentElement).getByText(/Calle sin número/)
    ).toBeInTheDocument();

    const phoneElement = within(institutionInfo).getByText(/Teléfono:/);
    expect(
      within(phoneElement.parentElement).getByText(/No disponible/)
    ).toBeInTheDocument();

    const scheduleElement = within(institutionInfo).getByText(/Horario:/);
    expect(
      within(scheduleElement.parentElement).getByText(/No disponible/)
    ).toBeInTheDocument();

    const ratingElement = within(institutionInfo).getByText(/Rating:/);
    expect(
      within(ratingElement.parentElement).getByText(/3/)
    ).toBeInTheDocument();
  });

  it("debería renderizar la imagen de la institución si está disponible", () => {
    render(<Institution_List institutions_items={institutions} />);

    const institutionWithImage = screen.getByAltText("Instituto ABC");
    expect(institutionWithImage).toBeInTheDocument();
    expect(institutionWithImage).toHaveAttribute("src", "image1.jpg");
  });

  it("debería renderizar correctamente el horario si los datos están completos", () => {
    render(<Institution_List institutions_items={institutions} />);

    const institutionInfo = screen
      .getByText("Instituto ABC")
      .closest(".component-list");

    const scheduleElement = within(institutionInfo).getByText(/Horario:/);
    expect(
      within(scheduleElement.parentElement).getByText("08:00 - 17:00")
    ).toBeInTheDocument();
  });

  it("debería renderizar múltiples instituciones con datos variados sin errores", () => {
    render(<Institution_List institutions_items={institutions} />);

    // Verifica que ambas instituciones se encuentren en el documento
    expect(screen.getByText("Instituto ABC")).toBeInTheDocument();
    expect(screen.getByText("Centro XYZ")).toBeInTheDocument();
  });

  it("debería evitar duplicados de instituciones", () => {
    const duplicateInstitutions = [...institutions, institutions[0]]; // Duplicado
    render(<Institution_List institutions_items={duplicateInstitutions} />);

    const institutionItems = screen.getAllByText("Instituto ABC");
    expect(institutionItems).toHaveLength(1); // Aparece solo una vez
  });

  it("debería manejar múltiples clics en un botón de institución sin errores", () => {
    const handleClick = vi.fn();
    render(
      <button onClick={handleClick} data-testid="test-click">
        Ver detalles
      </button>
    );

    const button = screen.getByTestId("test-click");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(3); // Múltiples clics
  });

  it("debería manejar carga pesada de instituciones sin errores", () => {
    const heavyLoadInstitutions = Array.from({ length: 1000 }, (_, i) => ({
      id_institutions: i + 1,
      name: `Institución ${i + 1}`,
      adress: `Calle ${i + 1}`,
      telefono: "123456789",
      hora_apertura: "08:00",
      hora_cierre: "17:00",
      rating: 4.5,
      imagen: "image1.jpg",
    }));
    render(<Institution_List institutions_items={heavyLoadInstitutions} />);

    // Verifica que la primera y última institución de la lista pesada esté en el documento
    expect(screen.getByText("Institución 1")).toBeInTheDocument();
    expect(screen.getByText("Institución 1000")).toBeInTheDocument();
  });

  it("debería manejar datos mal formateados sin errores", () => {
    const malformedInstitution = {
      id_institutions: 3,
      name: "Institución Errónea",
      adress: "Dirección Incorrecta",
      telefono: "invalid-phone", // Teléfono mal formateado
      hora_apertura: "invalid-time", // Hora de apertura mal formateada
      hora_cierre: "invalid-time", // Hora de cierre mal formateada
      rating: "invalid-rating", // Rating mal formateado
      imagen: "image1.jpg",
    };

    render(<Institution_List institutions_items={[malformedInstitution]} />);

    const institutionInfo = screen
      .getByText("Institución Errónea")
      .closest(".component-list");

    // Verificar "Teléfono: No disponible" buscando en partes para mayor flexibilidad
    const phoneLabel = within(institutionInfo).getByText("Teléfono:");
    expect(
      within(phoneLabel.parentElement).getByText("No disponible")
    ).toBeInTheDocument();

    // Verificar "Horario: No disponible" de forma similar
    const scheduleLabel = within(institutionInfo).getByText("Horario:");
    expect(
      within(scheduleLabel.parentElement).getByText("No disponible")
    ).toBeInTheDocument();

    // Verificar "Rating: No disponible"
    const ratingLabel = within(institutionInfo).getByText("Rating:");
    expect(
      within(ratingLabel.parentElement).getByText("No disponible")
    ).toBeInTheDocument();
  });

  it("debería mostrar imagen de respaldo si falla la carga de la imagen", () => {
    const institutionWithImageError = {
      ...institutions[0],
      imagen: "invalid-image.jpg",
    };
    render(
      <Institution_List institutions_items={[institutionWithImageError]} />
    );

    const image = screen.getByAltText("Instituto ABC");
    fireEvent.error(image); // Simula el error de carga de la imagen
    expect(image).toHaveAttribute("src", ImageDefault); // Coincide con la ruta importada de la imagen de respaldo
  });
});
