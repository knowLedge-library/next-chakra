/*
 * @Date: 2021-10-09 13:37:21
 * @Creator: Bobo
 * @LastEditors: Bobo
 * @LastEditTime: 2021-10-09 14:17:25
 * @Description: About language utils.
 */
import { Language } from "../types/language";
import { parseCookies } from "./cookies";

export const isServer = () => typeof window === "undefined";

export const isEnglish = () => parseCookies().locale === "en";

export const getLanguage = () =>
  (parseCookies().locale as Language) || Language.en;

export const getLanguageByNavigator = (locale?: Language) => {
  if (!locale) {
    if (!navigator.language) return Language.zh;
    else if (/zh/.test(navigator.language)) return Language.zh;
    else if (/en/.test(navigator.language)) return Language.en;
    return Language.en;
  }

  return locale;
};
