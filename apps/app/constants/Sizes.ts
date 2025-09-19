export const Spacing = {
  size000: -8,
  size00: -4,
  size1: 4,
  size2: 8,
  size3: 12,
  size4: 16,
  size5: 20,
  size6: 24,
  size7: 28,
  size8: 32,
  size9: 48,
  size10: 64,
  size11: 80,
  size12: 100,
  size13: 120,
  size14: 240,
  size15: 320,
  size16: 480,
  navigation: 56,
  container: 16,
} as const;

export const Radius = {
  size1: 2,
  size2: 4,
  size3: 6,
  size4: 8,
  size5: 12,
  size6: 16,
  full: 99,
} as const;

const BASE_FONT_SIZE = 14;

export const FontSize = {
  size00: 0.8 * BASE_FONT_SIZE,
  size0: 0.9 * BASE_FONT_SIZE,
  size1: 1.0 * BASE_FONT_SIZE,
  size2: 1.1 * BASE_FONT_SIZE,
  size3: 1.2 * BASE_FONT_SIZE,
  size4: 1.5 * BASE_FONT_SIZE,
  size5: 1.7 * BASE_FONT_SIZE,
  size6: 1.9 * BASE_FONT_SIZE,
  size7: 2.0 * BASE_FONT_SIZE,
  size8: 2.3 * BASE_FONT_SIZE,
} as const;

const BASE_LINE_HEIGHT = 1.3;

export const LineHeight = {
  size00: FontSize.size00 * BASE_LINE_HEIGHT,
  size0: FontSize.size0 * BASE_LINE_HEIGHT,
  size1: FontSize.size1 * BASE_LINE_HEIGHT,
  size2: FontSize.size2 * BASE_LINE_HEIGHT,
  size3: FontSize.size3 * 1.5,
  size4: FontSize.size4 * BASE_LINE_HEIGHT,
  size5: FontSize.size5 * BASE_LINE_HEIGHT,
  size6: FontSize.size6 * BASE_LINE_HEIGHT,
  size7: FontSize.size7 * BASE_LINE_HEIGHT,
  size8: FontSize.size8 * BASE_LINE_HEIGHT,
} as const;

export const FontWeight = {
  normal: "400",
  medium: "500",
  bold: "600",
  extraBold: "700",
} as const;
