import type { NextPage, NextPageContext } from "next";

import dynamic from "next/dynamic";
import Head from "next/head";
import { useIntl } from "react-intl";
import { Flex, Box, Spacer, Heading } from "@chakra-ui/react";

import TestNpmPackage from "components/NpmPackage";

// @todo: Save locale in localstorage or cookie.
interface IProps {
  locale: string | undefined;
}

const SwitchLanguage = dynamic(() => import("components/SwitchLanguage"), {
  ssr: false,
});

const Home: NextPage<IProps> = ({ locale }) => {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>Chakra Example！</title>
        <meta name="description" content="So useful library with Chakra！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box p={2} bgColor="gray.300">
        <Flex align="center">
          <Heading size="md">{intl.formatMessage({ id: "first" })}</Heading>

          <Spacer />
          <SwitchLanguage />
        </Flex>
      </Box>

      <span>{intl.formatMessage({ id: "t1" })}</span>

      <TestNpmPackage />
    </>
  );
};

Home.getInitialProps = (context: NextPageContext) => {
  const { query } = context;

  return {
    locale: query?.locale as string,
  };
};

export default Home;
