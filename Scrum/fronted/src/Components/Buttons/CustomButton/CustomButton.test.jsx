import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomButton from "./CustomButton";

// Test para renderizar el componente correctamente con las propiedades requeridas
test("Button renders correctly", () => {
  render(<CustomButton onClick={() => {}} buttonText="CLICK ME!" />);
});

// Test para verificar que se renderiza el texto "CLICK ME!"
test("Renders the text CLICK ME!", () => {
  render(<CustomButton buttonText="CLICK ME!" onClick={() => {}} />);
  const element = screen.getByText("CLICK ME!");
  expect(element).toBeInTheDocument();
});

// Test para verificar que la función de callback se llama al hacer clic
test("Calls the callback function when clicked", () => {
  const spy = vi.fn();
  render(<CustomButton buttonText="CLICK ME!" onClick={spy} />);
  const element = screen.getByText("CLICK ME!");

  fireEvent.click(element);

  expect(spy).toHaveBeenCalledTimes(1);
});
