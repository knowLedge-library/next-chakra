import { produce, Draft } from "immer";

import { Language } from "../../types/language";

import type { IRootDispatch } from "../store";
import type { IGlobalSettingState, ISettingState } from "./types";

const initialState: ISettingState = {
  load: true,
  currentIndex: 0,
  locale: Language.zh,
};

const model = {
  state: initialState,

  reducers: {
    setLocale(state: IGlobalSettingState, payload: Language) {
      return produce(state, (draftState: Draft<IGlobalSettingState>) => {
        draftState.locale = payload;
      });
    },

    setLoad(state: ISettingState, load: boolean) {
      return {
        ...state,
        load,
      };
    },

    setOnboardingCurrent: produce(
      (
        draftState: Draft<ISettingState>,
        payload: ISettingState["currentIndex"]
      ) => {
        draftState.currentIndex = payload;
      }
    ),

    // Or your logic is not really complicated
    setOns(state: ISettingState, payload: ISettingState["currentIndex"]) {
      return produce(state, (draftState: Draft<ISettingState>) => {
        draftState.currentIndex = payload;
      });
    },
  },

  effects: (dispatch: IRootDispatch) => ({
    // More direct execute `setLoad` fn.
    setLoadFalse(_payload: undefined) {
      dispatch.setting.setLoad(false);
    },
  }),
};

export default model;
