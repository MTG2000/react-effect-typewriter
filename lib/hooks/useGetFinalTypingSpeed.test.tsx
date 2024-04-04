import { renderHook } from "@testing-library/react";
import { useGetFinalTypingSpeed } from "./useGetFinalTypingSpeed";
import { Container } from "../components/Container";

describe("useGetFinalTypingSpeed", () => {
  it("should return the speed passed as argument", () => {
    const overrideSpeed = 100;
    const defaultSpeed = 200;

    const { result } = renderHook(() =>
      useGetFinalTypingSpeed(overrideSpeed, defaultSpeed)
    );

    expect(result.current).toBe(overrideSpeed);
  });

  it("should return the default speed if no speed is passed", () => {
    const defaultSpeed = 200;

    const { result } = renderHook(() =>
      useGetFinalTypingSpeed(undefined, defaultSpeed)
    );

    expect(result.current).toBe(defaultSpeed);
  });

  it("should return the inherited speed if no speed is passed", () => {
    const defaultSpeed = 200;
    const containerSpeed = 300;

    const { result } = renderHook(
      () => useGetFinalTypingSpeed(undefined, defaultSpeed),
      {
        wrapper: ({ children }) => (
          <Container typingSpeed={containerSpeed}>{children}</Container>
        ),
      }
    );

    expect(result.current).toBe(containerSpeed);
  });

  it("should return 0 if nothing is passed or inherited", () => {
    const { result } = renderHook(() => useGetFinalTypingSpeed());

    expect(result.current).toBe(0);
  });
});
