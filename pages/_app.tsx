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

import theme from "lib/theme";
import withRematch from "lib/withRematch";
import { localeMessages } from "lib/internation";

import { IRootDispatch, IRootState, store } from "modules/store";

import compose from "utils/compose";
import { isServer } from "utils/server";
import { getLanguageByNavigator } from "utils/language";
import { parseCookies, setCookie } from "utils/cookies";

import { Language } from "types/language";

import { LOCALE } from "constants/language";

type ThirdProps = {
  locale: Language;
};

type ConnectProps = ReturnType<typeof mapDispatchToProps>;

class MyApp extends App<ConnectProps & ThirdProps> {
  public static async getInitialProps({
    Component,
    ctx,
  }: {
    Component: any;
    ctx: NextPageContext;
  }) {
    let pageProps = {};
    let locale = parseCookies(ctx.req)?.locale as Language;

    if (isServer()) {
      ctx.res?.setHeader(
        "Set-Cookie",
        `locale=${locale}; Domain=localhost; Path=/;`
      );
    } else {
      locale = getLanguageByNavigator();
    }

    /**
     * @use Make sure the `getInitialProps` can be geted in other child pages.
     * @important Please Attention here.
     */
    if (Component.getInitialProps) {
      const data = await Component.getInitialProps(ctx);
      pageProps = { ...data };
    }

    return { pageProps, locale: locale || Language.zh };
  }

  public override componentDidMount() {
    const { locale, setLocale } = this.props;

    setCookie(LOCALE, locale, 7);
    setLocale(locale);
  }

  public override render() {
    const { Component, pageProps, locale } = this.props;

    return (
      <ChakraProvider theme={theme}>
        <IntlProvider
          locale={locale}
          messages={localeMessages[locale as Language]}
          textComponent="span"
        >
          <Provider store={store as any}>
            <Component {...pageProps} />
          </Provider>
        </IntlProvider>
      </ChakraProvider>
    );
  }
}

const mapDispatchToProps = ({ setting }: IRootDispatch) => ({
  setLocale: setting.setLocale,
});

export default compose(
  withRematch,
  connect(undefined, mapDispatchToProps)
)(MyApp);
