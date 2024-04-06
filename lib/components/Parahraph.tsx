import { useEffect, useRef, HTMLProps, useState } from "react";
import styles from "./styles.module.css";
import { useRegisterContainer } from "../hooks/useRegisterContainer";
import { useOnFinishedAnimation } from "../hooks/useOnFinishedAnimation";
import { useGetFinalTypingSpeed } from "../hooks/useGetFinalTypingSpeed";

interface Props extends HTMLProps<HTMLParagraphElement> {
  children: React.ReactNode;
  typingSpeed?: number;
  startAnimation?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onCancel?: () => void;
  onCharcter?: (char: string) => void;
}

const DEFAULT_TYPING_SPEED = 50;

export default function Parahraph({
  children,
  typingSpeed,
  startAnimation = true,
  onStart,
  onEnd,
  onCancel,
  onCharcter,
  className,
  ...restProps
}: Props) {
  const paragraphRef = useRef<HTMLParagraphElement>(null!);
  const visibleTextRef = useRef<HTMLSpanElement>(null!);
  const callbacks = useRef({ onStart, onEnd, onCancel, onCharcter });
  const [initiallyHidden, setInitiallyHidden] = useState(true);
  const [visibleText, setVisibleText] = useState("");

  const { shouldStart: containerShouldStart } = useRegisterContainer({
    startAnimation,
  });

  const onFinishedAnimation = useOnFinishedAnimation();
  const finalTypingSpeed = useGetFinalTypingSpeed(
    typingSpeed,
    DEFAULT_TYPING_SPEED
  );

  useEffect(() => {
    if (initiallyHidden) {
      setInitiallyHidden(false);
      return;
    }
    const paragraph = paragraphRef.current;

    const initialColor = window.getComputedStyle(paragraph).color;
    paragraph.style.color = "transparent";
    paragraph.style.setProperty("--font-color", initialColor);

    return () => {
      paragraph.style.color = initialColor;
    };
  }, [initiallyHidden]);

  useEffect(() => {
    if (!containerShouldStart || !startAnimation) return;

    const paragraph = paragraphRef.current;

    visibleTextRef.current.innerText = "";

    let currentLetter = 0;
    let cancel = false;
    let timeout: NodeJS.Timeout | null = null;
    const paragraphTextContent = paragraph.innerText ?? "";

    const typeWriter = () => {
      if (cancel) return;

      if (currentLetter < paragraphTextContent.length) {
        setVisibleText(paragraphTextContent.slice(0, currentLetter + 1));

        callbacks.current.onCharcter?.(paragraphTextContent[currentLetter]);
        currentLetter++;
      }

      if (currentLetter === paragraphTextContent.length) {
        // done
        callbacks.current.onEnd?.();
        onFinishedAnimation?.();
      } else timeout = setTimeout(typeWriter, finalTypingSpeed);
    };

    callbacks.current.onStart?.();
    typeWriter();

    const onCancel = callbacks.current.onCancel;

    return () => {
      cancel = true;
      if (timeout) clearTimeout(timeout);
      onCancel?.();
    };
  }, [
    finalTypingSpeed,
    onFinishedAnimation,
    containerShouldStart,
    startAnimation,
  ]);

  return (
    <p
      ref={paragraphRef}
      className={`${styles.typewriter_paragraph} ${
        initiallyHidden && styles.typewriter_paragraph__hidden
      } ${className}`}
      {...restProps}
      data-content={visibleText}
    >
      {children}
      <span
        ref={visibleTextRef}
        className={styles.visible_text}
        data-content={visibleText}
        aria-hidden
      ></span>
    </p>
  );
}
