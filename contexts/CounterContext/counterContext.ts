import { createContext } from "react";

export type CounterType = {
  count: number;
  setCount: (state: number) => void;
};

export const CounterContext = createContext<CounterType>({
  count: 0,
  setCount: () => {},
});

CounterContext.displayName = "CounterContext";
