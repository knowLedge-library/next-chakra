import type { IStore } from "modules/store";

export declare global {
  interface Window {
    // Usage: lib/withRematch.tsx
    __NEXT_REDUX_STORE__: IStore;
  }
}
