/*
 * @Date: 2021-10-09 13:39:26
 * @Creator: Bobo
 * @LastEditors: Bobo
 * @LastEditTime: 2021-10-09 13:43:51
 * @Description: About handle cookie utils.
 */
import cookie from "cookie";

import { isServer } from "./language";

export const parseCookies = (req?: any, options = {}) => {
  return cookie.parse(
    req ? req.headers.cookie || "" : !isServer() ? document.cookie : "",
    options
  );
};

export const removeCookie = (cookieName: string) => {
  // if a cookie is set with a path, the same path must be present when removing
  document.cookie = cookie.serialize(cookieName, "", {
    expires: new Date("16 Sep 1992 00:00:00 GMT"),
    path: "/",
    domain: "your domain",
  });
};

export const setCookie = (name: string, value: string, days: number) => {
  if (!process.browser) return;

  let expires = "";

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
