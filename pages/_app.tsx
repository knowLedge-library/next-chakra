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
import { Button, ChakraProvider } from "@chakra-ui/react";

import { ErrorBoundary } from "components/ErrorBoundary";

import theme from "lib/theme";
import withRematch from "lib/withRematch";
import { localeMessages } from "lib/internation";

import { IRootDispatch, store } from "modules/store";

import compose from "utils/compose";
import { isServer } from "utils/server";
import { getLanguageByNavigator } from "utils/language";
import { parseCookies, setCookie } from "utils/cookies";

import { Language } from "types/language";

import { LOCALE } from "constants/language";

const Fallback: React.FC<{ error: Error }> = ({ error }) => {
  console.log(error, "err ??");

  return (
    <div>
      <h3>error crashed</h3>
      <span>error: {JSON.stringify(error)}</span>
      <Button onClick={() => window.location.reload()}>reload</Button>
    </div>
  );
};

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
          {/* <ErrorBoundary fallback={(props) => <Fallback {...props} />}> */}
          <Provider store={store as any}>
            <Component {...pageProps} />
          </Provider>
          {/* </ErrorBoundary> */}
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
