import { useContext, useEffect, useState } from "react";
import { TypewriterContext } from "../components/Container";

type Options = {
  startAnimation?: boolean;
};

export const useRegisterContainer = (options: Options) => {
  const layoutContext = useContext(TypewriterContext);
  const insideContainer = layoutContext !== null;

  const [shouldStart, setShouldStart] = useState(
    insideContainer ? false : true
  );

  const registerElement = layoutContext?.registerElement;

  useEffect(() => {
    if (!insideContainer) return;
    if (options.startAnimation === false) return;

    const unregister = registerElement!({
      onStart: () => {
        setShouldStart(true);
      },
    });

    return () => {
      unregister();
      setShouldStart(false);
    };
  }, [insideContainer, options.startAnimation, registerElement]);

  return {
    shouldStart,
  };
};
