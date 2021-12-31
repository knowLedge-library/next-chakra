import * as React from "react";
import { IGlyph } from ".";

const GlyphsBase = {
  404: {
    data: <svg></svg>,
    viewBox: "10 19 10 10",
  },
};

type Glyphs = { [key in keyof typeof GlyphsBase]: IGlyph } & {
  [key: string]: IGlyph;
};
const Glyphs: Glyphs = GlyphsBase;

export default Glyphs;
