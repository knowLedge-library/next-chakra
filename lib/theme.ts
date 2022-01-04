/*
 * @Date: 2021-09-12 16:33:46
 * @Creator: Bobo
 * @LastEditors: Bobo
 * @LastEditTime: 2021-10-26 15:25:00
 * @Description: Custom theme.
 */
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme(config);

export default theme;
