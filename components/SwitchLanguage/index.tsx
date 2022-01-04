import type { IRootDispatch, IRootState } from "modules/store";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast, Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { stringify } from "querystring";

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

  return (
    <RadioGroup onChange={handleChange} value={locale}>
      <Stack direction="row">
        <Radio value={Language.zh}>ZH</Radio>
        <Radio value={Language.en}>EN</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default SwitchLanguage;
