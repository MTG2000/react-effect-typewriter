import Paragraph from "../lib/components/Paragraph";
import { act, render, screen, waitFor } from "@testing-library/react";
import {
  expectElementToBeHidden,
  expectElementToFullyAppeared,
  expectElementToHaveTextAppeared,
} from "./helpers";

describe("Paragraph", () => {
  it("should render correctly", async () => {
    render(<Paragraph>Test</Paragraph>);

    const el = screen.getByText("Test");

    expectElementToHaveTextAppeared(el, "T");

    await waitFor(() => {
      expectElementToFullyAppeared("Test");
    });
  });

  it("should appear according to the typing speed", async () => {
    render(<Paragraph typingSpeed={100}>Test</Paragraph>);

    const el = screen.getByText("Test");

    expectElementToHaveTextAppeared(el, "T");
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expectElementToHaveTextAppeared(el, "Te");
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expectElementToHaveTextAppeared(el, "Tes");

    await waitFor(() => {
      expectElementToFullyAppeared("Test");
    });
  });

  it("should invoke callbacks on the right time", async () => {
    const onStart = vi.fn();
    const onEnd = vi.fn();
    const onCancel = vi.fn();
    const onCharcter = vi.fn();

    render(
      <Paragraph
        onStart={onStart}
        onEnd={onEnd}
        onCancel={onCancel}
        onCharcter={onCharcter}
        typingSpeed={100}
      >
        Test
      </Paragraph>
    );

    const el = screen.getByText("Test");

    expectElementToHaveTextAppeared(el, "T");
    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onCharcter).toHaveBeenCalledWith("T");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(onCharcter).toHaveBeenCalledWith("e");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(onCharcter).toHaveBeenCalledWith("s");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(onCharcter).toHaveBeenCalledWith("t");

    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it("should not start when 'startAnimation' is false", async () => {
    const { rerender } = render(
      <Paragraph startAnimation={false}>Test</Paragraph>
    );

    expectElementToBeHidden("Test");

    rerender(<Paragraph startAnimation={true}>Test</Paragraph>);

    const el = screen.getByText("Test");
    expectElementToHaveTextAppeared(el, "T");
  });
});
