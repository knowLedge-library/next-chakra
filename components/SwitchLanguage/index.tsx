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

  // Try to console the custom server message.
  const handleClick = async () => {
    const result = await fetch("http://localhost:3030/setting/set-cookie", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: stringify({
        message: "Second mesage",
      }),
    });

    if (result?.status === 200) {
      return toast({
        position: "top",
        title: "Successed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    console.log(result, "result");
  };

  const handleAll = async () => {
    throw new Error("I crashedddd!");

    // const allMessage = await fetch("http://localhost:3030/setting/all").then(
    //   (r) => r.json()
    // );

    // console.log(allMessage);
  };

  return (
    <RadioGroup onChange={handleChange} value={locale}>
      <Stack direction="row" bgColor="transparent">
        <Radio value={Language.zh}>ZH</Radio>
        <Radio value={Language.en}>EN</Radio>
      </Stack>

      {/* <Button onClick={handleClick}>Console server message</Button> */}
      <Button onClick={handleAll}>Get all</Button>
    </RadioGroup>
  );
};

export default SwitchLanguage;
