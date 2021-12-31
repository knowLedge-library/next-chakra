/******************************* REMATCH STUFF *******************************/

// Copied from an offical rematch/typescript usage example:
// https://github.com/rematch/rematch/blob/8cc3f1631e05b1d4d44c5607f6d0b14f84027c69/examples/ts/strict-count/src/models/util.d.ts

interface ModelReducers<S = any> {
  [key: string]: (state: S, payload: any) => S;
}

interface ModelEffects<RootState = any> {
  [key: string]: (payload?: any, rootState?: RootState) => any;
}

interface ModelSelect<RootState = any> {
  [key: string]: (models: any, args: any) => (rootState: RootState) => any;
}

export interface ModelConfig<S = any, RS = any> {
  state: S;
  reducers: ModelReducers<S>;
  effects?:
    | ModelEffects<RS>
    | ((dispatch: any) => ModelEffects<RS>)
    | (() => ModelEffects<RS>);
  selectors?: (slice: any, createSelector: any, hasProps: any) => ModelSelect<RS>;
}

export interface Models<M = any> {
  [key: string]: ModelConfig<M>;
}

export type RematchRootState<M extends Models> = {
  [modelKey in keyof M]: M[modelKey]['state'];
};

// export type RematchRootSelect<M extends Models> = {
//   [modelKey in keyof M]: M[modelKey]['selectors'] extends Function
//     ? SelectFromModel<ReturnType<M[modelKey]['selectors']>>
//     : {}
// };

export type SelectFromModel<S extends ModelSelect> = {
  [selectKey in keyof S]: ReturnType<ReturnType<S[selectKey]>>;
};

export type ReducerFromModel<R extends ModelReducers> = {
  [reducerKey in keyof R]: Reducer2connect<R[reducerKey]>;
};

export type EffectFromModel<E extends ModelEffects> = {
  [effectKey in keyof E]: Effect2connect<E[effectKey]>;
};

type Reducer2connect<R extends Function> = R extends (
  state: infer S,
  ...payload: infer P
) => any
  ? (...payload: P) => void
  : () => void;

type Effect2connect<E extends Function> = E extends (
  payload: infer P,
  ...args: any[]
) => Promise<infer S>
  ? P extends undefined
    ? () => Promise<S>
    : (payload: P) => Promise<S>
  : E extends (payload: infer P, ...args: any[]) => infer S
  ? P extends undefined
    ? () => Promise<S>
    : (payload: P) => Promise<S>
  : E extends () => Promise<infer S>
  ? () => Promise<S>
  : E extends () => infer S
  ? () => Promise<S>
  : () => Promise<any>;

type PermissiveReturnType<T> = T extends (...args: any) => infer R ? R : T;

export type RematchRootDispatch<M extends Models> = {
  [modelKey in keyof M]: ReducerFromModel<M[modelKey]['reducers']> &
    EffectFromModel<PermissiveReturnType<M[modelKey]['effects']>>;
};

export type RematchRootSelect<M extends Models, RS> = <T>(
  selector: (
    models: {
      [modelKey in keyof M]: SelectFromModel<ReturnType<M[modelKey]['selectors']>>;
    },
  ) => T,
) => (state: RS) => T;

declare module '@rematch/core' {
  export function init<S, D, L>(
    config: any,
  ): {
    dispatch: D;
    select: L;
    getState(): S;
  };
}

/***************************** END REMATCH STUFF *****************************/

import { IStore } from 'modules/store';

type Dispatch = IStore['dispatch'];

// Based on @see https://github.com/rematch/rematch/issues/601#issuecomment-466766288
declare module 'react-redux' {
  interface Connect {
    // eslint-disable-next-line unused-imports/no-unused-vars
    <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
      mapStateToProps: null | undefined,
      mapDispatchToProps: (dispatch: Dispatch) => TDispatchProps,
    ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>;

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
      mapDispatchToProps: (dispatch: Dispatch) => TDispatchProps,
    ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>;
  }
}
