import { Container } from "../lib/components/Container";
import Paragraph from "../lib/components/Parahraph";
import { act, render, screen, waitFor } from "@testing-library/react";
import {
  expectElementToBeHidden,
  expectElementToFullyAppeared,
  expectElementToHaveTextAppeared,
} from "./helpers";

describe("Container", () => {
  it("should render correctly", async () => {
    render(
      <Container>
        <Paragraph>Test</Paragraph>
      </Container>
    );

    const el = screen.getByText("Test");

    expectElementToHaveTextAppeared(el, "T");

    await waitFor(() => {
      expectElementToFullyAppeared("Test");
    });
  });

  it("should appear according to the typing speed", async () => {
    render(
      <Container typingSpeed={100}>
        <Paragraph>Test</Paragraph>
      </Container>
    );

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

  it("should not start when 'startAnimation' is false", async () => {
    const { rerender } = render(
      <Container startAnimation={false}>
        <Paragraph>Test</Paragraph>
      </Container>
    );

    expectElementToBeHidden("Test");

    rerender(
      <Container startAnimation={true}>
        <Paragraph>Test</Paragraph>
      </Container>
    );

    const el = screen.getByText("Test");
    expectElementToHaveTextAppeared(el, "T");
  });

  it("should show paragraphs in order", async () => {
    render(
      <Container typingSpeed={100} delayBetweenElements={0}>
        <Paragraph>Test</Paragraph>
        <Paragraph>Test 2</Paragraph>
      </Container>
    );

    expectElementToBeHidden("Test 2");

    act(() => {
      vi.advanceTimersByTime(400);
    });

    const el2 = screen.getByText("Test 2");

    expectElementToHaveTextAppeared(el2, "T");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expectElementToHaveTextAppeared(el2, "Test 2");
  });

  it("should show paragraphs with delay", async () => {
    render(
      <Container typingSpeed={100} delayBetweenElements={500}>
        <Paragraph>Test</Paragraph>
        <Paragraph>Test 2</Paragraph>
      </Container>
    );

    expectElementToBeHidden("Test 2");

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expectElementToBeHidden("Test 2");

    const el2 = screen.getByText("Test 2");
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expectElementToHaveTextAppeared(el2, "T");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expectElementToHaveTextAppeared(el2, "Test 2");
  });

  it("should work with nested containers with varying speeds", async () => {
    render(
      <Container typingSpeed={50}>
        <Paragraph>Test 1</Paragraph>
        <Container typingSpeed={100}>
          <Paragraph>Test 2</Paragraph>
          <Paragraph typingSpeed={200}>Test 3</Paragraph>
        </Container>
      </Container>
    );

    expectElementToBeHidden("Test 2");
    expectElementToBeHidden("Test 3");

    act(() => {
      vi.advanceTimersByTime(250);
    });

    const el2 = screen.getByText("Test 2");

    expectElementToFullyAppeared("Test 1");
    expectElementToBeHidden("Test 2");

    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expectElementToHaveTextAppeared(el2, "T");

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expectElementToFullyAppeared("Test 2");

    const el3 = screen.getByText("Test 3");

    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expectElementToHaveTextAppeared(el3, "T");

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expectElementToFullyAppeared("Test 3");
  });
});
