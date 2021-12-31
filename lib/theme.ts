/*
 * @Date: 2021-09-12 16:33:46
 * @Creator: Bobo
 * @LastEditors: Bobo
 * @LastEditTime: 2021-10-26 15:25:00
 * @Description: Custom theme.
 */
import { extendTheme } from "@chakra-ui/react";

// 扩展主题以包括自定义颜色、字体等
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme(colors);

export default theme;
