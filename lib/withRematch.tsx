import type { IRootState } from "../modules/store";
import type { NextPage } from "next";
import type { IStore } from "../modules/store";

import React from "react";

import { store } from "../modules/store";
import { isServer } from "../utils/server";

// https://github.com/zeit/next.js/blob/canary/examples/with-rematch/shared/withRematch.js
function getOrCreateStore() {
  // 如果是服务端，则始终创建一个新的store，否则状态将在请求之间共享
  if (isServer()) {
    return store;
  }

  // 如果客户端不可用，则创建 store，并将其设置在 window 对象上
  if (!window.__NEXT_REDUX_STORE__) {
    window.__NEXT_REDUX_STORE__ = store;
  }

  return window.__NEXT_REDUX_STORE__;
}

// 用于在服务端和客户端上通用地创建 store
const withRematch = (App: NextPage<{ store: IStore }>) => {
  return class AppWithRematch extends React.Component {
    private store: IStore;

    public static async getInitialProps(appContext: any) {
      const reduxStore = getOrCreateStore();

      // 为页面的 getInitialProps 提供store
      appContext.ctx.store = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return appProps;
    }

    constructor(props: any) {
      super(props);
      this.store = getOrCreateStore();
    }

    public render() {
      return <App {...this.props} store={this.store} />;
    }
  };
};
export default withRematch;

export const combineMapStateAndSelection =
  <S, T, P>(
    mapState: (state: IRootState, props: P) => S,
    mapSelection: (state: IRootState, props: P) => T
  ) =>
  (state: IRootState, props: P) => ({
    ...mapState(state, props),
    ...mapSelection(state, props),
  });
