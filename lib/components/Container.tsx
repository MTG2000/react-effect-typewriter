import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useShouldStart } from "../hooks/useShouldStart";
import { useOnFinishedAnimation } from "../hooks/useOnFinishedAnimation";

// Define the context type
type ContextType = {
  registerElement: (options: { onStart: () => void }) => () => void;
  finishedAnimation: () => void;
};

type RegisteredElement = {
  startAnimation: () => void;
};

// Create the context
const TypewriterContext = createContext<ContextType | null>(null);

// Create the context provider component
const Container: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [elements, setElements] = useState([] as RegisteredElement[]);
  const [currentlyAnimatingElement, setCurrentlyAnimatingElement] = useState(0);

  const shouldStart = useShouldStart();
  const onFinishedAnimation = useOnFinishedAnimation();

  const handleRegisterElement = useCallback<ContextType["registerElement"]>(
    ({ onStart }) => {
      const element = { startAnimation: onStart };

      setElements((prev) => [...prev, element]);

      return () => {
        setElements((prev) => prev.filter((el) => el !== element));
      };
    },
    []
  );

  const finishedAnimation = useCallback<
    ContextType["finishedAnimation"]
  >(() => {
    setCurrentlyAnimatingElement((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (elements.length === 0) return;

    if (!shouldStart) return;

    if (currentlyAnimatingElement >= elements.length) {
      onFinishedAnimation?.();
      return;
    }
    elements[currentlyAnimatingElement].startAnimation();
  }, [currentlyAnimatingElement, elements, onFinishedAnimation, shouldStart]);

  return (
    <TypewriterContext.Provider
      value={{ registerElement: handleRegisterElement, finishedAnimation }}
    >
      {children}
    </TypewriterContext.Provider>
  );
};

export { TypewriterContext, Container };
