import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useShouldStart } from "../hooks/useShouldStart";
import { useOnFinishedAnimation } from "../hooks/useOnFinishedAnimation";
import { useGetFinalTypingSpeed } from "../hooks/useGetFinalTypingSpeed";

type ContextType = {
  registerElement: (options: { onStart: () => void }) => () => void;
  finishedAnimation: () => void;
  typeingSpeed?: number;
};

type RegisteredElement = {
  startAnimation: () => void;
};

const TypewriterContext = createContext<ContextType | null>(null);

export interface Props {
  children: React.ReactNode;
  typeingSpeed?: number;
  enableLogs?: boolean;
}

const Container = ({ children, typeingSpeed, enableLogs }: Props) => {
  const elementsQueueRef = useRef<RegisteredElement[]>([]);
  const [isQueueEmpty, setIsQueueEmpty] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const shouldStart = useShouldStart() && !isAnimating;
  const onFinishedAnimation = useOnFinishedAnimation();
  const finalTypingSpeed = useGetFinalTypingSpeed(typeingSpeed);

  const handleRegisterElement = useCallback<ContextType["registerElement"]>(
    ({ onStart }) => {
      const element = { startAnimation: onStart };
      elementsQueueRef.current.push(element);

      if (enableLogs) {
        console.log(
          "Typewriter.Container: Registering element",
          "Elements in queue",
          elementsQueueRef.current.length
        );
      }

      setIsQueueEmpty(false);

      return () => {
        elementsQueueRef.current = elementsQueueRef.current.filter(
          (el) => el !== element
        );

        if (elementsQueueRef.current.length === 0) {
          setIsQueueEmpty(true);
          setIsAnimating(false);
        }

        if (enableLogs) {
          console.log(
            "Typewriter.Container: Unregistering element",
            "Elements in queue",
            elementsQueueRef.current.length
          );
        }
      };
    },
    [enableLogs]
  );

  const finishedAnimation = useCallback<
    ContextType["finishedAnimation"]
  >(() => {
    const updatedElementsQueue = elementsQueueRef.current.slice(1);
    elementsQueueRef.current = updatedElementsQueue;

    if (enableLogs) {
      console.log(
        "Typewriter.Container: Finished animation. Remaining elements:",
        updatedElementsQueue.length
      );
    }

    if (updatedElementsQueue.length > 0) {
      updatedElementsQueue[0].startAnimation();
    } else {
      onFinishedAnimation?.();
      setIsAnimating(false);
      setIsQueueEmpty(true);
    }
  }, [enableLogs, onFinishedAnimation]);

  useEffect(() => {
    if (isQueueEmpty) return;

    if (shouldStart) {
      if (enableLogs) {
        console.log("Typewriter.Container: Starting animation");
      }

      elementsQueueRef.current[0].startAnimation();
      setIsAnimating(true);
    }
  }, [enableLogs, isQueueEmpty, shouldStart]);

  return (
    <TypewriterContext.Provider
      value={{
        registerElement: handleRegisterElement,
        finishedAnimation,
        typeingSpeed: finalTypingSpeed,
      }}
    >
      {children}
    </TypewriterContext.Provider>
  );
};

export { TypewriterContext, Container };
