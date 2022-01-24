import { useContext } from "react";
import { CounterContext } from "./counterContext";

export const useCounterContext = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error(
      "useCounterContext must be used within a CounterContextProvider"
    );
  }

  return context;
};
