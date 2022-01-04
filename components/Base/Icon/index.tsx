import React from "react";
import styled from "@emotion/styled";

import glyphs from "./glyphs";

export interface IGlyph {
  viewBox: string;
  data: JSX.Element;
}
export interface IIcon {
  className?: string;
  fill?: string;
  icon: IGlyph;
  isAriaHidden?: boolean;
  size: {
    height?: number;
    width?: number;
  };
  viewBox?: string;
}

const Svg = styled.svg<{ fill?: string }>`
  ${(props) =>
    props.fill
      ? `
    & path {
      fill: ${props.fill}
    }
  `
      : ""}
`;

const Icon: React.FC<IIcon> = ({
  className,
  fill,
  size: { height, width },
  icon,
  isAriaHidden,
  viewBox,
}) => (
  <Svg
    className={className}
    style={{ display: "block" }}
    aria-hidden={isAriaHidden}
    fill={fill}
    height={height}
    role={!isAriaHidden ? "img" : ""}
    version="1.1"
    viewBox={viewBox || icon.viewBox || "0 0 200 200"}
    width={width}
  >
    {icon.data}
  </Svg>
);

export { Icon as default, glyphs };
