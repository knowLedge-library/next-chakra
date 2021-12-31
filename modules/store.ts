import { init } from "@rematch/core";
import selectPlugin from "@rematch/select";

import {
  RematchRootDispatch,
  RematchRootState,
  RematchRootSelect,
} from "../rematch";

import * as models from "./model";

export type IRootState = RematchRootState<typeof models>;
export type IRootDispatch = RematchRootDispatch<typeof models>;
export type IRootSelect = RematchRootSelect<typeof models, IRootState>;

export const store = init<IRootState, IRootDispatch, IRootSelect>({
  models,
  plugins: [selectPlugin()],
  redux: {
    devtoolOptions: {
      maxAge: 100,
    },
  },
});

export type IStore = typeof store;
