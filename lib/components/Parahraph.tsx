import {
  useEffect,
  useRef,
  HTMLProps,
  useLayoutEffect,
  useState,
  useContext,
} from "react";
import styles from "./styles.module.css";
import { TypewriterContext } from "./Container";

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

  const layoutContext = useContext(TypewriterContext);

  const insideContainer = layoutContext !== undefined;

  const [shouldStartAnimation, setShouldStartAnimation] = useState(
    insideContainer ? false : true
  );

  useLayoutEffect(() => {
    const paragraph = ref.current;

    const initialColor = window.getComputedStyle(paragraph).color;
    paragraph.style.color = "transparent";
    paragraph.style.setProperty("--font-color", initialColor);

    return () => {
      paragraph.style.color = initialColor;
    };
  }, []);

  const registerElement = layoutContext?.registerElement;

  useEffect(() => {
    if (!insideContainer) return;

    registerElement!({
      start: () => {
        setShouldStartAnimation(true);
      },
    });

    return () => {
      setShouldStartAnimation(false);
    };
  }, [insideContainer, registerElement]);

  const notifyLayoutFinishedAnimation = layoutContext?.finishedAnimation;

  useEffect(() => {
    if (!shouldStartAnimation) return;

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
        notifyLayoutFinishedAnimation?.();
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
  }, [notifyLayoutFinishedAnimation, shouldStartAnimation]);

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
