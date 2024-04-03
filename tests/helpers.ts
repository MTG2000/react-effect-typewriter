import { screen } from "@testing-library/react";

export function expectElementToBeHidden(text: string) {
  const element = screen.getByText(text);

  const dataContentAttribute = element.getAttribute("data-content");

  expect(
    dataContentAttribute === null || dataContentAttribute === ""
  ).toBeTruthy();
}

export function expectElementToFullyAppeared(text: string) {
  expect(screen.getByText(text)).toHaveAttribute("data-content", text);
}

export function expectElementToHaveTextAppeared(
  element: HTMLElement,
  text: string
) {
  expect(element).toHaveAttribute("data-content", text);
}
