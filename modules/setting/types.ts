import type { Language } from "../../types/language";

export interface IWorkspaceState {
  load: boolean;
}

export interface IOnboardingState {
  currentIndex: number;
}

export interface IGlobalSettingState {
  locale: Language;
}

export interface ISettingState
  extends IWorkspaceState,
    IOnboardingState,
    IGlobalSettingState {}
