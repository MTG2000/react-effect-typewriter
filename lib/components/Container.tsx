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
  delayBetweenElements?: number;
  enableLogs?: boolean;
}

const Container = ({
  children,
  typeingSpeed,
  delayBetweenElements,
  enableLogs,
}: Props) => {
  const elementsQueueRef = useRef<RegisteredElement[]>([]);
  const [isQueueEmpty, setIsQueueEmpty] = useState(false);
  const isAnimatingRef = useRef(false);

  const shouldStart = useShouldStart() && !isAnimatingRef.current;
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

      const unregister = () => {
        const isCurrentlyAnimatingElement =
          elementsQueueRef.current[0] === element &&
          isAnimatingRef.current === true;

        elementsQueueRef.current = elementsQueueRef.current.filter(
          (el) => el !== element
        );

        if (elementsQueueRef.current.length === 0) {
          setIsQueueEmpty(true);
          isAnimatingRef.current = false;
        } else if (isCurrentlyAnimatingElement) {
          elementsQueueRef.current[0].startAnimation();
        }

        if (enableLogs) {
          console.log(
            "Typewriter.Container: Unregistering element",
            "Elements in queue",
            elementsQueueRef.current.length
          );
        }
      };

      return unregister;
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
      const elementToAnimate = updatedElementsQueue[0];
      setTimeout(() => {
        elementToAnimate.startAnimation();
      }, delayBetweenElements);
    } else {
      setIsQueueEmpty(true);
      isAnimatingRef.current = false;
      onFinishedAnimation?.();
    }
  }, [delayBetweenElements, enableLogs, onFinishedAnimation]);

  useEffect(() => {
    if (isQueueEmpty) return;

    if (shouldStart) {
      if (enableLogs) {
        console.log("Typewriter.Container: Starting animation");
      }

      elementsQueueRef.current[0].startAnimation();
      isAnimatingRef.current = true;
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
