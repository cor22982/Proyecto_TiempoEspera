import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Label_Input from "./Label_Input";
import { vi } from "vitest";
import "@testing-library/jest-dom";

describe("Componente Label_Input", () => {
  it("debería renderizar el label y el botón de edición correctamente", () => {
    render(
      <Label_Input
        label_name="Nombre"
        onChange={() => {}}
        to_Send={() => {}}
        value=""
      />
    );
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "edit" })).toBeInTheDocument();
  });

  it("debería mostrar el campo de entrada y los botones de acción al hacer clic en el botón de edición", () => {
    render(
      <Label_Input
        label_name="Nombre"
        onChange={() => {}}
        to_Send={() => {}}
        value=""
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "edit" }));

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "check" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "cancel" })).toBeInTheDocument();
  });

  it("debería llamar a onChange al escribir en el campo de entrada", () => {
    const onChangeMock = vi.fn();
    render(
      <Label_Input
        label_name="Nombre"
        onChange={onChangeMock}
        to_Send={() => {}}
        value=""
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "edit" }));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Nuevo valor" },
    });

    expect(onChangeMock).toHaveBeenCalledWith("Nuevo valor");
  });

  it("debería llamar a to_Send y cerrar el campo de entrada al hacer clic en confirmar", async () => {
    const to_SendMock = vi.fn().mockResolvedValue();
    render(
      <Label_Input
        label_name="Nombre"
        onChange={() => {}}
        to_Send={to_SendMock}
        value="Test"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "edit" }));
    fireEvent.click(screen.getByRole("button", { name: "check" }));

    await waitFor(() => expect(to_SendMock).toHaveBeenCalled());
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("debería cerrar el campo de entrada sin llamar a to_Send al hacer clic en cancelar", () => {
    const to_SendMock = vi.fn();
    render(
      <Label_Input
        label_name="Nombre"
        onChange={() => {}}
        to_Send={to_SendMock}
        value="Test"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "edit" }));
    fireEvent.click(screen.getByRole("button", { name: "cancel" }));

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(to_SendMock).not.toHaveBeenCalled();
  });

  it("no debería llamar a to_Send si el campo de entrada está vacío", async () => {
    const to_SendMock = vi.fn();
    render(
      <Label_Input
        label_name="Nombre"
        onChange={() => {}}
        to_Send={to_SendMock}
        value=""
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "edit" }));
    fireEvent.click(screen.getByRole("button", { name: "check" }));

    await waitFor(() => expect(to_SendMock).not.toHaveBeenCalled());
  });

  it("debería mantener el valor actual si el usuario cancela la edición", () => {
    const onChangeMock = vi.fn();
    render(
      <Label_Input
        label_name="Nombre"
        onChange={onChangeMock}
        to_Send={() => {}}
        value="Valor inicial"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "edit" }));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Valor cambiado" },
    });
    fireEvent.click(screen.getByRole("button", { name: "cancel" }));

    expect(onChangeMock).toHaveBeenCalledWith("Valor cambiado");
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("debería confirmar y cerrar correctamente al hacer clic en el botón de confirmación después de editar", async () => {
    const to_SendMock = vi.fn().mockResolvedValue();
    render(
      <Label_Input
        label_name="Nombre"
        onChange={() => {}}
        to_Send={to_SendMock}
        value="Nuevo valor"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "edit" }));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Actualizado" },
    });
    fireEvent.click(screen.getByRole("button", { name: "check" }));

    await waitFor(() => expect(to_SendMock).toHaveBeenCalled());
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("debería mostrar el nuevo valor en el campo de texto después de confirmación", async () => {
    const to_SendMock = vi.fn().mockResolvedValue();
    const onChangeMock = vi.fn();
    render(
      <Label_Input
        label_name="Nombre"
        onChange={onChangeMock}
        to_Send={to_SendMock}
        value="Actualizado"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "edit" }));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Finalizado" },
    });
    fireEvent.click(screen.getByRole("button", { name: "check" }));

    await waitFor(() => expect(to_SendMock).toHaveBeenCalled());
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByText("Nombre")).toBeInTheDocument();
  });

  it("debería mantener los estados independientes al editar múltiples Label_Input", () => {
    const onChangeMock1 = vi.fn();
    const onChangeMock2 = vi.fn();

    render(
      <>
        <Label_Input
          label_name="Nombre 1"
          onChange={onChangeMock1}
          to_Send={() => {}}
          value="Valor 1"
        />
        <Label_Input
          label_name="Nombre 2"
          onChange={onChangeMock2}
          to_Send={() => {}}
          value="Valor 2"
        />
      </>
    );

    // Editar solo el primer Label_Input
    const editButton1 = screen.getAllByRole("button", { name: "edit" })[0];
    fireEvent.click(editButton1);

    const textBox1 = screen.getAllByRole("textbox")[0];
    fireEvent.change(textBox1, { target: { value: "Nuevo Valor 1" } });

    expect(onChangeMock1).toHaveBeenCalledWith("Nuevo Valor 1");
    expect(onChangeMock2).not.toHaveBeenCalled();

    // Verificar que el segundo Label_Input no esté en modo de edición
    expect(screen.queryAllByRole("textbox").length).toBe(1); // Solo un campo de texto visible
  });
});
