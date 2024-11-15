import { render, screen } from "@testing-library/react";
import Stats from "./AttendanceChart";
import styles from "./AttendanceChart.module.css";

describe("Stats Component", () => {
  const mockDatos = {
    Lunes: 5,
    Martes: 10,
    Miércoles: 3,
    Jueves: 8,
    Viernes: 6,
  };

  test("debería renderizar una barra para cada día", () => {
    render(<Stats datos={mockDatos} />);

    Object.keys(mockDatos).forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
      expect(screen.getByText(mockDatos[day])).toBeInTheDocument();
    });
  });

  test("debería asignar alturas proporcionales a cada barra basada en el valor máximo", () => {
    render(<Stats datos={mockDatos} />);
    const maxValue = Math.max(...Object.values(mockDatos));

    Object.entries(mockDatos).forEach(([day, value]) => {
      const barElement = screen.getByText(day).previousSibling;
      const expectedHeight = `${(value / maxValue) * 100}%`;
      expect(barElement).toHaveStyle(`min-height: ${expectedHeight}`);
    });
  });

  test("debería mostrar correctamente los valores en las etiquetas de cada barra", () => {
    render(<Stats datos={mockDatos} />);

    Object.entries(mockDatos).forEach(([day, value]) => {
      const labelElement = screen.getByText(value);
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveClass(styles.label); // Confirma que usa la clase de estilo correcta
    });
  });
});
