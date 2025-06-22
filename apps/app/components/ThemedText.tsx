import { StyleSheet, Text, type TextProps, Platform } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Radius } from "@/constants/Sizes";
import { H1_STYLE, H2_STYLE, H3_STYLE, H4_STYLE, H5_STYLE, H6_STYLE, TEXT_DEFAULT_STYLE } from "@/constants/Styles";
import { useTextColor } from "@/hooks/useTextColor";

export type TThemedTextType =
  | "default"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "code";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: TThemedTextType;
  color?: "text" | "text2";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  color,
  ...rest
}: ThemedTextProps) {
  const textColor = useTextColor(type, color);
  const colorBackground2 = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background2"
  );
  const baseStyles = styles[type];

  return (
    <Text
      style={[
        { color: textColor },
        baseStyles,
        type === "code" ? { backgroundColor: colorBackground2 } : {},
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: TEXT_DEFAULT_STYLE,
  h1: H1_STYLE,
  h2: H2_STYLE,
  h3: H3_STYLE,
  h4: H4_STYLE,
  h5: H5_STYLE,
  h6: H6_STYLE,
  code: {
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
    padding: 2,
    borderRadius: Radius.size3,
    ...TEXT_DEFAULT_STYLE,
  },
});
