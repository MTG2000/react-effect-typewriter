import { useEffect, useRef, HTMLProps, useLayoutEffect } from "react";
import styles from "./styles.module.css";
import { useShouldStart } from "../hooks/useShouldStart";
import { useOnFinishedAnimation } from "../hooks/useOnFinishedAnimation";

interface Props extends HTMLProps<HTMLParagraphElement> {
  children: React.ReactNode;
  onStart?: () => void;
  onEnd?: () => void;
  onCancel?: () => void;
  onCharcter?: (char: string) => void;
}

export default function Parahraph({
  children,
  className,
  onStart,
  onEnd,
  onCancel,
  onCharcter,
  ...restProps
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null!);
  const callbacks = useRef({ onStart, onEnd, onCancel, onCharcter });

  const shouldStart = useShouldStart();
  const onFinishedAnimation = useOnFinishedAnimation();

  useLayoutEffect(() => {
    const paragraph = ref.current;

    const initialColor = window.getComputedStyle(paragraph).color;
    paragraph.style.color = "transparent";
    paragraph.style.setProperty("--font-color", initialColor);

    return () => {
      paragraph.style.color = initialColor;
    };
  }, []);

  useEffect(() => {
    if (!shouldStart) return;

    const paragraph = ref.current;

    if (!paragraph) return;

    const paragraphTextContent = paragraph.textContent ?? "";

    let currentLetter = 0;
    let cancel = false;
    let timeout: NodeJS.Timeout | null = null;

    const typeWriter = () => {
      if (cancel) return;

      if (currentLetter < paragraphTextContent.length) {
        paragraph.setAttribute(
          "data-content",
          paragraphTextContent.slice(0, currentLetter + 1)
        );

        callbacks.current.onCharcter?.(paragraphTextContent[currentLetter]);
        currentLetter++;
      } else {
        // done
      }

      if (currentLetter === paragraphTextContent.length) {
        // done
        callbacks.current.onEnd?.();
        onFinishedAnimation?.();
      } else timeout = setTimeout(typeWriter, 50);
    };

    callbacks.current.onStart?.();
    typeWriter();

    const onCancel = callbacks.current.onCancel;

    return () => {
      cancel = true;
      if (timeout) clearTimeout(timeout);
      onCancel?.();
    };
  }, [onFinishedAnimation, shouldStart]);

  return (
    <p
      ref={ref}
      className={`${styles.typewriter_paragraph} ${className}`}
      {...restProps}
    >
      {children}
    </p>
  );
}
