import { FontSize, FontWeight, LineHeight, Spacing } from "./Sizes";

const HEADING_LINE_HEIGHT = 1.3;

export const H1_STYLE = {
  fontSize: FontSize.size8,
  fontWeight: FontWeight.bold,
  marginBlockStart: Spacing.size5,
  marginBlockEnd: Spacing.size2,
  lineHeight: FontSize.size8 * HEADING_LINE_HEIGHT,
} as const;
export const H2_STYLE = {
  fontSize: FontSize.size7,
  fontWeight: FontWeight.bold,
  marginBlockStart: Spacing.size5,
  marginBlockEnd: Spacing.size2,
  lineHeight: FontSize.size7 * HEADING_LINE_HEIGHT,
} as const;
export const H3_STYLE = {
  fontSize: FontSize.size6,
  fontWeight: FontWeight.bold,
  marginBlockStart: Spacing.size4,
  marginBlockEnd: Spacing.size2,
  lineHeight: FontSize.size6 * HEADING_LINE_HEIGHT,
} as const;
export const H4_STYLE = {
  fontSize: FontSize.size4,
  fontWeight: FontWeight.bold,
  marginBlockStart: Spacing.size4,
  marginBlockEnd: Spacing.size2,
  lineHeight: FontSize.size4 * HEADING_LINE_HEIGHT,
} as const;
export const H5_STYLE = {
  fontSize: FontSize.size3,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size2,
  lineHeight: FontSize.size3 * HEADING_LINE_HEIGHT,
} as const;
export const H6_STYLE = {
  fontSize: FontSize.size2,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size2,
  lineHeight: FontSize.size2 * HEADING_LINE_HEIGHT,
} as const;
export const TEXT_DEFAULT_STYLE = {
  fontSize: FontSize.size3,
  lineHeight: LineHeight.size3,
} as const;

export const BOLD_STYLE = { fontWeight: FontWeight.bold } as const;
export const ITALIC_STYLE = { fontStyle: "italic" } as const;
export const UNDERLINE_STYLE = { textDecorationLine: "underline" } as const;
