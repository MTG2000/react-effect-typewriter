import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

// Define the context type
type ContextType = {
  registerElement: (options: { start: () => void }) => void;
  finishedAnimation: () => void;
};

type RegisteredElement = {
  start: () => void;
};

// Create the context
const TypewriterContext = createContext<ContextType | undefined>(undefined);

// Create the context provider component
const Container: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [elements, setElements] = useState([] as RegisteredElement[]);
  const [currentlyAnimatingElement, setCurrentlyAnimatingElement] = useState(0);

  const onRegisterElement = useCallback<ContextType["registerElement"]>(
    ({ start }) => {
      setElements((prev) => [...prev, { start }]);
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

    elements[currentlyAnimatingElement].start();
  }, [elements, currentlyAnimatingElement]);

  return (
    <TypewriterContext.Provider
      value={{ registerElement: onRegisterElement, finishedAnimation }}
    >
      {children}
    </TypewriterContext.Provider>
  );
};

export { TypewriterContext, Container };
