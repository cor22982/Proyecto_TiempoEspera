import { render, screen, fireEvent } from "@testing-library/react";
import Coment from "./Coment";
import ImageModal from "@components/Modals/ImageModal/ImageModal";
import { vi } from "vitest";

describe("Componente Coment", () => {
  it("debería renderizar correctamente el nombre, fecha y comentario", () => {
    render(
      <Coment
        from="Usuario de Prueba"
        date="2023-01-01"
        coment="Este es un comentario de prueba."
      />
    );

    expect(screen.getByText("Usuario de Prueba")).toBeInTheDocument();
    expect(screen.getByText("(2023-01-01)")).toBeInTheDocument();
    expect(
      screen.getByText("Este es un comentario de prueba.")
    ).toBeInTheDocument();
  });

  it("debería mostrar la imagen si se proporciona imageUrl", () => {
    render(
      <Coment
        from="Usuario"
        date="2023-01-01"
        coment="Comentario con imagen"
        imageUrl="https://example.com/image.jpg"
      />
    );

    const imageElement = screen.getByAltText("Comentario adjunto");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://deimoss.web05.lol/images/image.jpg"
    );
  });

  it("debería abrir el modal de imagen al hacer clic en la imagen", () => {
    render(
      <Coment
        from="Usuario"
        date="2023-01-01"
        coment="Comentario con imagen"
        imageUrl="https://example.com/image.jpg"
      />
    );

    // Simula el clic en la imagen para abrir el modal
    const imageElement = screen.getByAltText("Comentario adjunto");
    fireEvent.click(imageElement);

    // Verifica si el modal está abierto
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Selecciona la imagen dentro del modal usando getAllByRole y verifica el src de la imagen en el modal
    const modalImage = screen
      .getAllByRole("img")
      .find((img) => img.className.includes("modalImage"));
    expect(modalImage).toHaveAttribute(
      "src",
      "https://deimoss.web05.lol/images/image.jpg"
    );
  });

  it("debería cerrar el modal cuando se activa el cierre", () => {
    render(
      <Coment
        from="Usuario"
        date="2023-01-01"
        coment="Comentario con imagen"
        imageUrl="https://example.com/image.jpg"
      />
    );

    const imageElement = screen.getByAltText("Comentario adjunto");
    fireEvent.click(imageElement);

    const closeButton = screen.getByRole("button", { name: /cerrar/i });
    fireEvent.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("no debería renderizar la imagen ni el modal si imageUrl no está presente", () => {
    render(
      <Coment
        from="Usuario sin imagen"
        date="2023-01-01"
        coment="Comentario sin imagen"
      />
    );

    expect(screen.queryByAltText("Comentario adjunto")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("no debería permitir URLs de imágenes con protocolos inseguros", () => {
    const insecureImageUrl = "javascript:alert('XSS')";

    render(
      <Coment
        from="Usuario"
        date="2023-01-01"
        coment="Comentario con imagen insegura"
        imageUrl={insecureImageUrl}
      />
    );

    const imageElement = screen.getByAltText("Comentario adjunto");
    expect(imageElement).not.toHaveAttribute("src", insecureImageUrl);
  });

  it("debería abrir el modal solo una vez con múltiples clics rápidos en la imagen", () => {
    render(
      <Coment
        from="Usuario"
        date="2023-01-01"
        coment="Comentario con imagen"
        imageUrl="https://example.com/image.jpg"
      />
    );

    const imageElement = screen.getByAltText("Comentario adjunto");

    // Simula múltiples clics rápidos en la imagen
    fireEvent.click(imageElement);
    fireEvent.click(imageElement);
    fireEvent.click(imageElement);

    // Verifica que el modal solo se abra una vez
    expect(screen.getAllByRole("dialog").length).toBe(1);
  });
});
