import { useContext } from "react";
import { TypewriterContext } from "../components/Container";

export const useOnFinishedAnimation = () => {
  const ctx = useContext(TypewriterContext);

  const onFinishedAnimation = ctx?.finishedAnimation;

  return onFinishedAnimation;
};
