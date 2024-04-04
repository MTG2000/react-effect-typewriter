import { useContext } from "react";
import { TypewriterContext } from "../components/Container";

function useGetFinalTypingSpeed(speed?: number): number | undefined;
function useGetFinalTypingSpeed(
  speed: number | undefined,
  defaultSpeed: number
): number;
function useGetFinalTypingSpeed(speed?: number, defaultSpeed?: number) {
  const ctx = useContext(TypewriterContext);

  const inheritedSpeed = ctx?.typingSpeed;

  return speed ?? inheritedSpeed ?? defaultSpeed ?? 0;
}

export { useGetFinalTypingSpeed };
