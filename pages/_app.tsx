// Polyfills
import "@formatjs/intl-locale/polyfill";

import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/zh";
import "@formatjs/intl-pluralrules/locale-data/en";

import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/zh";

import type { NextPageContext } from "next";

import App from "next/app";
import { Provider, connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../lib/theme";
import { localeMessages } from "../lib/internation";
import { IRootState, store } from "../modules/store";
import compose from "../utils/compose";
import withRematch from "../lib/withRematch";

type ConnectProps = ReturnType<typeof mapStateToProps>;

class MyApp extends App<ConnectProps> {
  public static async getInitialProps({
    Component,
    ctx,
  }: {
    Component: any;
    ctx: NextPageContext;
  }) {
    let pageProps = {};

    /**
     * @use Make sure the `getInitialProps` can be geted in other child pages.
     * @important Please Attention here.
     */
    if (Component.getInitialProps) {
      const data = await Component.getInitialProps(ctx);
      pageProps = { ...data };
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, locale } = this.props;

    console.log(locale);

    return (
      <ChakraProvider theme={theme}>
        <IntlProvider
          locale={locale}
          messages={localeMessages[locale]}
          textComponent="span"
        >
          {/* @ts-ignore */}
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </IntlProvider>
      </ChakraProvider>
    );
  }
}

const mapStateToProps = ({ setting }: IRootState) => ({
  locale: setting.locale,
});

export default compose(withRematch, connect(mapStateToProps, undefined))(MyApp);
