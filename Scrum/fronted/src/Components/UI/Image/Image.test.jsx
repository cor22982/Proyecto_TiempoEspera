import { render, screen, fireEvent } from "@testing-library/react";
import ImageComponent from "./Image";
import ImageDefault from "@assets/default_banner_institution.jpg";

describe("ImageComponent", () => {
  test("debería renderizar la imagen con el src proporcionado", () => {
    const src = "http://example.com/image.jpg";
    const alt = "Imagen de prueba";

    render(<ImageComponent src={src} alt={alt} />);

    const imageElement = screen.getByAltText(alt);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", src);
  });

  test("debería renderizar la imagen predeterminada cuando src es null", () => {
    const alt = "Imagen de prueba predeterminada";

    render(<ImageComponent src={null} alt={alt} />);

    const imageElement = screen.getByAltText(alt);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", ImageDefault);
  });

  test("debería renderizar la imagen predeterminada cuando src está vacío", () => {
    const alt = "Imagen de prueba predeterminada";

    render(<ImageComponent src="" alt={alt} />);

    const imageElement = screen.getByAltText(alt);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", ImageDefault);
  });

  test("debería ejecutar onClick cuando se hace clic en la imagen", () => {
    const onClickMock = vi.fn();
    const src = "http://example.com/image.jpg";
    const alt = "Imagen de prueba";

    render(<ImageComponent src={src} alt={alt} onClick={onClickMock} />);

    const imageContainer = screen.getByRole("img", { name: alt }).parentElement;
    fireEvent.click(imageContainer);

    expect(onClickMock).toHaveBeenCalled();
  });
});
