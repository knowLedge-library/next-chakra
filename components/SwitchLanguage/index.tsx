import type { IRootDispatch, IRootState } from "modules/store";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast, Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";

import { LOCALE } from "constants/language";

import { setCookie } from "utils/cookies";

import { Language } from "types/language";

const SwitchLanguage: React.FC = () => {
  const toast = useToast();
  const locale = useSelector((state: IRootState) => state.setting.locale);

  const {
    setting: { setLocale },
  } = useDispatch<IRootDispatch>();

  const handleChange = (value: Language) => {
    setLocale(value);

    setCookie(LOCALE, value, 7);
    window.location.reload();
  };

  const handleTrowError = () => {
    try {
      if (locale === Language.en) {
        throw new Error("error - language");
      }
    } catch (error) {
      throw new Error(`${error} - Throw a custom error！！！！`);
    }
  };

  return (
    <RadioGroup onChange={handleChange} value={locale}>
      <Stack direction="row" bgColor="transparent">
        <Radio value={Language.zh}>ZH</Radio>
        <Radio value={Language.en}>EN</Radio>
      </Stack>

      {/* <Button onClick={handleClick}>Console server message</Button> */}
      <Button onClick={handleTrowError}>Throw error</Button>
    </RadioGroup>
  );
};

export default SwitchLanguage;
