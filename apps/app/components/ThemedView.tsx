import { Spacing } from "@/constants/Sizes";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  padding?: number;
  container?: boolean;
};

export function ThemedView({
  padding,
  style,
  lightColor,
  darkColor,
  container,
  ...otherProps
}: ThemedViewProps) {
  return (
    <View
      style={[style, { padding: container ? Spacing.container : padding }]}
      {...otherProps}
    />
  );
}
