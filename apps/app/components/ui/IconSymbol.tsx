// Fallback for using MaterialIcons on Android and web.

import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolViewProps, SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof MaterialIcons>["name"]
>;
export type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  house: "home",
  newspaper: "feed",
  magnifyingglass: "search",
  "person.crop.circle": "person",
  "chevron.forward": "chevron-right",
  "app.badge": "mark-chat-unread", // unread
  "clock.badge": "access-time",
  "clock.badge.fill": "access-time-filled",
  photo: "photo",
  star: "star-border",
  "star.fill": "star",
  "chevron.right": "chevron-right",
  link: "link",
  "smallcircle.fill.circle": "radio-button-checked",
  "rectangle.stack": "list-alt",
  "arrow.clockwise": "refresh",
  envelope: "email",
  checkmark: "check",
  "arrow.up.forward.app": "open-in-new",
  "xmark": "clear",
  "folder": "folder",
  "info.square": "info-outline",
  "globe": "language",
  "person.bubble": "person-pin",
  "message": "chat",
  "star.square": "stars",
  "checkmark.circle": "check-circle-outline",
  "checkmark.circle.fill": "check-circle",
  "square.and.arrow.up": "ios-share",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const colorText = useThemeColor({}, "text");
  return (
    <MaterialIcons
      color={color ?? colorText}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
