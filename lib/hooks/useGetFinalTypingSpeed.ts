import { useContext } from "react";
import { TypewriterContext } from "../components/Container";

function useGetFinalTypingSpeed(speed?: number): number | undefined;
function useGetFinalTypingSpeed(
  speed: number | undefined,
  defaultSpeed: number
): number;
function useGetFinalTypingSpeed(speed?: number, defaultSpeed?: number) {
  const ctx = useContext(TypewriterContext);

  const inheritedSpeed = ctx?.typeingSpeed;

  return speed ?? inheritedSpeed ?? defaultSpeed;
}

export { useGetFinalTypingSpeed };
