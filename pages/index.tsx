import type { NextPage } from "next";

import Head from "next/head";
import Image from "next/image";
import { useIntl } from "react-intl";
import {
  Flex,
  Box,
  Spacer,
  Heading,
  useColorMode,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import SwitchLanguage from "components/SwitchLanguage";
import TestNpmPackage from "components/NpmPackage";

import tsLongLogo from "public/assets/ts-lang-logo.png";
import Switch from "components/Base/Switch";

const Index: NextPage<{}> = () => {
  const intl = useIntl();
  const { colorMode, toggleColorMode } = useColorMode();
  const boxBgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <>
      <Head>
        <title>Chakra Example！</title>
        <meta name="description" content="So useful library with Chakra！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box p={2} bgColor={boxBgColor}>
        <Flex align="center" borderRadius="3xl">
          <Heading size="md">{intl.formatMessage({ id: "first" })}</Heading>

          <Spacer />
          <SwitchLanguage />
        </Flex>
      </Box>

      <Button onClick={toggleColorMode}>
        {intl.formatMessage({ id: "toggle" })}
        {colorMode === "light" ? "Dark" : "Light"}
      </Button>

      <span>{intl.formatMessage({ id: "t1" })}</span>

      <TestNpmPackage />

      <Image
        src={tsLongLogo}
        width={400}
        height={200}
        placeholder="blur"
        alt="ts-lang-logo"
      />

      <Switch defaultChecked />
    </>
  );
};

export default Index;
