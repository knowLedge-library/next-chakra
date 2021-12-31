import enMessages from "../locales/en.json";
import zhMessages from "../locales/zh.json";

import { Language } from "../types/language";

export const localeMessages: Record<Language, Record<string, string>> = {
  [Language.en]: enMessages,
  [Language.zh]: zhMessages,
};
