import { useContext, useEffect, useState } from "react";
import { TypewriterContext } from "../components/Container";

export const useShouldStart = () => {
  const layoutContext = useContext(TypewriterContext);
  const insideContainer = layoutContext !== null;

  const [shouldStart, setShouldStart] = useState(
    insideContainer ? false : true
  );

  const registerElement = layoutContext?.registerElement;

  useEffect(() => {
    if (!insideContainer) return;

    const unregister = registerElement!({
      onStart: () => {
        setShouldStart(true);
      },
    });

    return () => {
      unregister();
      setShouldStart(false);
    };
  }, [insideContainer, registerElement]);

  return shouldStart;
};
