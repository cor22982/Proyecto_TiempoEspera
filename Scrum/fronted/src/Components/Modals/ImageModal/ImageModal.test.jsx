import { render, screen, fireEvent } from "@testing-library/react";
import ImageModal from "./ImageModal";

describe("ImageModal Component", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test("debería renderizar el modal cuando `imageSrc` está presente", () => {
    render(<ImageModal imageSrc="image.jpg" onClose={mockOnClose} />);

    const modalImage = screen.getByAltText("Vista previa");
    expect(modalImage).toBeInTheDocument();
    expect(modalImage).toHaveAttribute("src", "image.jpg");

    const closeButton = screen.getByRole("button", { name: /cerrar/i });
    expect(closeButton).toBeInTheDocument();
  });

  test("no debería renderizar nada cuando `imageSrc` es `null`", () => {
    render(<ImageModal imageSrc={null} onClose={mockOnClose} />);
    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });

  test("debería llamar a `onClose` cuando se hace clic en el fondo (overlay)", () => {
    render(<ImageModal imageSrc="image.jpg" onClose={mockOnClose} />);

    const overlay = screen.getByRole("dialog");
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("debería llamar a `onClose` cuando se hace clic en el botón de cerrar", () => {
    render(<ImageModal imageSrc="image.jpg" onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /cerrar/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("no debería cerrar el modal cuando se hace clic dentro del contenido del modal", () => {
    render(<ImageModal imageSrc="image.jpg" onClose={mockOnClose} />);

    const modalContent = screen.getByRole("dialog").firstChild;
    fireEvent.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
