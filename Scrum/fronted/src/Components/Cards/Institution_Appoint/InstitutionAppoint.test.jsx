import { render, screen, fireEvent } from "@testing-library/react";
import Institution_Appoint from "./Institution_Appoint";
import { expect } from "vitest";
import ImageDefault from "@assets/default_institution.jpeg";

describe("Componente Institution_Appoint", () => {
  const mockData = {
    name: "Instituto ABC",
    imagen_inst: "image1.jpg",
    list_appointments: [
      {
        procedure_name: "Registro",
        appointment_time: "10:30:00",
        appointment_date: "2023-11-01",
      },
      {
        procedure_name: "Consulta",
        appointment_time: "14:00:00",
        appointment_date: "2023-11-02",
      },
    ],
  };

  it("debería renderizar el nombre de la institución y la imagen", () => {
    render(
      <Institution_Appoint
        name={mockData.name}
        imagen_inst={mockData.imagen_inst}
        list_appointments={mockData.list_appointments}
      />
    );

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    const image = screen.getByAltText(`Imagen de ${mockData.name}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockData.imagen_inst);
  });

  it("debería mostrar imagen de respaldo si falla la carga de la imagen", () => {
    render(
      <Institution_Appoint
        name={mockData.name}
        imagen_inst="invalid-image.jpg"
        list_appointments={mockData.list_appointments}
      />
    );

    const image = screen.getByAltText(`Imagen de ${mockData.name}`);
    fireEvent.error(image); // Simula el error de carga de la imagen
    expect(image).toHaveAttribute("src", ImageDefault); // Imagen de respaldo
  });

  it("debería renderizar cada reservación con procedimiento, hora y fecha", () => {
    render(
      <Institution_Appoint
        name={mockData.name}
        imagen_inst={mockData.imagen_inst}
        list_appointments={mockData.list_appointments}
      />
    );

    mockData.list_appointments.forEach((appointment) => {
      expect(
        screen.getByText(`Trámite: ${appointment.procedure_name}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `Hora: ${appointment.appointment_time.substring(0, 5)}`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `Fecha: ${new Date(appointment.appointment_date).toLocaleDateString(
            "es-ES"
          )}`
        )
      ).toBeInTheDocument();
    });
  });

  it("debería manejar el caso de lista de reservaciones vacía sin errores", () => {
    render(
      <Institution_Appoint
        name={mockData.name}
        imagen_inst={mockData.imagen_inst}
        list_appointments={[]}
      />
    );

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.queryByText(/Trámite:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Hora:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Fecha:/)).not.toBeInTheDocument();
  });

  it("debería manejar una lista de reservaciones extensa sin problemas", () => {
    const largeAppointmentList = Array.from({ length: 100 }, (_, i) => ({
      procedure_name: `Trámite ${i + 1}`,
      appointment_time: "12:00:00",
      appointment_date: "2023-11-03",
    }));

    render(
      <Institution_Appoint
        name={mockData.name}
        imagen_inst={mockData.imagen_inst}
        list_appointments={largeAppointmentList}
      />
    );

    expect(screen.getByText("Trámite: Trámite 1")).toBeInTheDocument();
    expect(
      screen.getByText(`Trámite: Trámite ${largeAppointmentList.length}`)
    ).toBeInTheDocument();
  });

  it("debería mostrar las fechas y horas correctamente formateadas", () => {
    render(
      <Institution_Appoint
        name={mockData.name}
        imagen_inst={mockData.imagen_inst}
        list_appointments={mockData.list_appointments}
      />
    );

    const appointment = mockData.list_appointments[0];
    expect(
      screen.getByText(`Hora: ${appointment.appointment_time.substring(0, 5)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Fecha: ${new Date(appointment.appointment_date).toLocaleDateString(
          "es-ES"
        )}`
      )
    ).toBeInTheDocument();
  });
});
