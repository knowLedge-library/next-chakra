import type { IRootDispatch, IRootState } from "../../modules/store";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

import { Language } from "../../types/language";

const SwitchLanguage: React.FC = () => {
  const locale = useSelector((state: IRootState) => state.setting.locale);

  const {
    setting: { setLocale },
  } = useDispatch<IRootDispatch>();

  return (
    <RadioGroup onChange={setLocale} value={locale}>
      <Stack direction="row">
        <Radio value={Language.zh}>zh</Radio>
        <Radio value={Language.en}>en</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default SwitchLanguage;
