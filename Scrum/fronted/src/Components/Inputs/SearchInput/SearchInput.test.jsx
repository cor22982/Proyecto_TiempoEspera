import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "./SearchInput";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

describe("Componente SearchInput", () => {
  const onChangeMock = vi.fn();
  const onPressEnterMock = vi.fn();
  const suggestions = ["apple", "banana", "orange", "grape", "pineapple"];

  beforeEach(() => {
    onChangeMock.mockClear();
    onPressEnterMock.mockClear();
  });

  it("debería renderizar correctamente con placeholder", () => {
    render(
      <SearchInput
        icono={faSearch}
        placeholder="Buscar..."
        onChange={onChangeMock}
        value=""
        onpressenter={onPressEnterMock}
        suggestions={suggestions}
      />
    );
    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
  });

  it("debería llamar a onChange al escribir en el campo de entrada", () => {
    render(
      <SearchInput
        icono={faSearch}
        placeholder="Buscar..."
        onChange={onChangeMock}
        value=""
        onpressenter={onPressEnterMock}
        suggestions={suggestions}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Buscar..."), {
      target: { value: "banana" },
    });

    expect(onChangeMock).toHaveBeenCalledWith("banana");
  });

  it("debería ejecutar búsqueda y llamar a onpressenter al presionar Enter", () => {
    render(
      <SearchInput
        icono={faSearch}
        placeholder="Buscar..."
        onChange={onChangeMock}
        value="apple"
        onpressenter={onPressEnterMock}
        suggestions={suggestions}
      />
    );

    fireEvent.keyDown(screen.getByPlaceholderText("Buscar..."), {
      key: "Enter",
      code: "Enter",
    });

    expect(onPressEnterMock).toHaveBeenCalled();
  });

  it("debería limpiar el campo de entrada al hacer clic en el botón de limpiar", () => {
    render(
      <SearchInput
        icono={faSearch}
        placeholder="Buscar..."
        onChange={onChangeMock}
        value="banana"
        onpressenter={onPressEnterMock}
        suggestions={suggestions}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onChangeMock).toHaveBeenCalledWith("");
  });
});
