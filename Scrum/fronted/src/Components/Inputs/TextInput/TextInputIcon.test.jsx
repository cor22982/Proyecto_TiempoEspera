import { render, screen, fireEvent } from "@testing-library/react";
import TextInputIcon from "./TextInputIcon";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "@testing-library/jest-dom";

describe("TextInputIcon Component", () => {
  const mockOnChange = vi.fn();
  const mockOnIconClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("debería renderizar correctamente el icono estático", () => {
    render(
      <TextInputIcon
        type="text"
        name="username"
        placeholder="Enter username"
        value=""
        onChange={mockOnChange}
        icon={faEye}
      />
    );
    const iconElement = screen.getByTestId("icon-static");
    expect(iconElement).toBeInTheDocument();
  });

  test("debería renderizar correctamente el icono clickeable", () => {
    render(
      <TextInputIcon
        type="password"
        name="password"
        placeholder="Enter password"
        value=""
        onChange={mockOnChange}
        icon={faEye}
        iconOnClick={faEyeSlash}
        onIconClick={mockOnIconClick}
      />
    );
    const clickableIcon = screen.getByTestId("icon-clickable");
    expect(clickableIcon).toBeInTheDocument();
  });

  test("debería cambiar el tipo de input de password a text al hacer clic en el icono", () => {
    render(
      <TextInputIcon
        type="password"
        name="password"
        placeholder="Enter password"
        value=""
        onChange={mockOnChange}
        icon={faEye}
        iconOnClick={faEyeSlash}
        onIconClick={mockOnIconClick}
      />
    );
    const input = screen.getByPlaceholderText("Enter password");
    const clickableIcon = screen.getByTestId("icon-clickable");

    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(clickableIcon);
    expect(input).toHaveAttribute("type", "text");
    expect(mockOnIconClick).toHaveBeenCalled();
  });

  test("debería cambiar el tipo de input a 'date' cuando el tipo original es 'date' y se enfoca", () => {
    render(
      <TextInputIcon
        type="date"
        name="date"
        placeholder="Select date"
        value=""
        onChange={mockOnChange}
        icon={faEye}
      />
    );
    const input = screen.getByPlaceholderText("Select date");

    fireEvent.focus(input);
    expect(input).toHaveAttribute("type", "date");
  });

  test("debería cambiar el tipo de input a 'time' cuando el tipo original es 'time' y se enfoca", () => {
    render(
      <TextInputIcon
        type="time"
        name="time"
        placeholder="Select time"
        value=""
        onChange={mockOnChange}
        icon={faEye}
      />
    );
    const input = screen.getByPlaceholderText("Select time");

    fireEvent.focus(input);
    expect(input).toHaveAttribute("type", "time");
  });

  test("debería llamar a onChange cuando se cambia el valor del input", () => {
    render(
      <TextInputIcon
        type="text"
        name="username"
        placeholder="Enter username"
        value=""
        onChange={mockOnChange}
        icon={faEye}
      />
    );
    const input = screen.getByPlaceholderText("Enter username");

    fireEvent.change(input, { target: { value: "new value" } });
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test("no debería cambiar el tipo de input al hacer clic en el icono si onIconClick no está definido", () => {
    render(
      <TextInputIcon
        type="password"
        name="password"
        placeholder="Enter password"
        value=""
        onChange={mockOnChange}
        icon={faEye}
      />
    );

    const input = screen.getByPlaceholderText("Enter password");

    // Verificar que el icono clickeable no esté en el DOM
    expect(screen.queryByTestId("icon-clickable")).toBeNull();

    // Verificar que el tipo del input siga siendo "password"
    expect(input).toHaveAttribute("type", "password");
  });
});
