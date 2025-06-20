import { FontSize, FontWeight, Spacing } from "./Sizes";

export const H1_STYLE = {
  fontSize: FontSize.size8,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size3,
} as const;
export const H2_STYLE = {
  fontSize: FontSize.size7,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size3,
  paddingBlock: Spacing.size1,
  lineHeight: FontSize.size7 * 1.3,
} as const;
export const H3_STYLE = {
  fontSize: FontSize.size6,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size2,
} as const;
export const H4_STYLE = {
  fontSize: FontSize.size4,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size2,
} as const;
export const H5_STYLE = {
  fontSize: FontSize.size3,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size2,
} as const;
export const H6_STYLE = {
  fontSize: FontSize.size2,
  fontWeight: FontWeight.bold,
  marginBlock: Spacing.size2,
} as const;
export const TEXT_DEFAULT_STYLE = {
  fontSize: FontSize.size2,
  lineHeight: FontSize.size2 * 1.5,
} as const;