import type { IRootState } from "../modules/store";

import React from "react";

import { store } from "../modules/store";
import { isServer } from "../utils/server";

const __NEXT_REDUX_STORE__: string = "__NEXT_REDUX_STORE__";

// https://github.com/zeit/next.js/blob/canary/examples/with-rematch/shared/withRematch.js
function getOrCreateStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer()) {
    return store;
  }

  // Create store if unavailable on the client and set it on the window object
  if (!(window as any)[__NEXT_REDUX_STORE__]) {
    (window as any)[__NEXT_REDUX_STORE__] = store;
  }

  return (window as any)[__NEXT_REDUX_STORE__];
}

const withRematch = (App: any) => {
  return class AppWithRematch extends React.Component {
    public static async getInitialProps(appContext: any) {
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.store = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return appProps;
    }

    // @ts-ignore
    constructor(props) {
      super(props);
      // @ts-ignore
      this.store = getOrCreateStore();
    }

    public render() {
      // @ts-ignore
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
