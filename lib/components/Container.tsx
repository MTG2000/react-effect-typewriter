import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useShouldStart } from "../hooks/useShouldStart";
import { useOnFinishedAnimation } from "../hooks/useOnFinishedAnimation";

type ContextType = {
  registerElement: (options: { onStart: () => void }) => () => void;
  finishedAnimation: () => void;
};

type RegisteredElement = {
  startAnimation: () => void;
};

const TypewriterContext = createContext<ContextType | null>(null);

const Container: React.FC<{ children: ReactNode }> = ({ children }) => {
  const elementsQueueRef = useRef<RegisteredElement[]>([]);

  const shouldStart = useShouldStart();
  const onFinishedAnimation = useOnFinishedAnimation();

  const handleRegisterElement = useCallback<ContextType["registerElement"]>(
    ({ onStart }) => {
      const element = { startAnimation: onStart };

      elementsQueueRef.current.push(element);

      return () => {
        elementsQueueRef.current = elementsQueueRef.current.filter(
          (el) => el !== element
        );
      };
    },
    []
  );

  const finishedAnimation = useCallback<
    ContextType["finishedAnimation"]
  >(() => {
    const updatedElementsQueue = elementsQueueRef.current.slice(1);
    elementsQueueRef.current = updatedElementsQueue;
    if (updatedElementsQueue.length > 0) {
      updatedElementsQueue[0].startAnimation();
    } else {
      onFinishedAnimation?.();
    }
  }, [onFinishedAnimation]);

  useEffect(() => {
    if (elementsQueueRef.current.length === 0) return;

    if (shouldStart) elementsQueueRef.current[0].startAnimation();
  }, [shouldStart]);

  return (
    <TypewriterContext.Provider
      value={{ registerElement: handleRegisterElement, finishedAnimation }}
    >
      {children}
    </TypewriterContext.Provider>
  );
};

export { TypewriterContext, Container };
