import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { FontSize, FontWeight, Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import { IconSymbol, IconSymbolName } from "../ui/IconSymbol";

export type ButtonVariant = "primary" | "text" | "secondary";

export type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
  startIcon?: IconSymbolName;
};

export const Button: FC<ButtonProps> = ({
  children,
  onPress,
  style,
  variant = "primary",
  startIcon,
}) => {
  const colorPrimary = useThemeColor({}, "primary");
  const colorText3 = useThemeColor({}, "text3");
  const colorTextInverted = useThemeColor({}, "textInverted");
  const isChildrenString = typeof children === "string";

  const variants = {
    primary: {
      button: {
        backgroundColor: colorPrimary,
      },
      text: { color: colorTextInverted },
    },
    secondary: {
      button: {
        backgroundColor: colorText3,
      },
      text: { color: colorTextInverted },
    },
    text: {
      button: {},
      text: { color: colorPrimary },
    },
  } as const satisfies Record<
    ButtonVariant,
    { text: Record<string, unknown>; button: Record<string, unknown> }
  >;
  return (
    <Pressable
      onPress={onPress}
      style={[style, buttonStyles.button, variants[variant].button]}
    >
      {startIcon && (
        <IconSymbol name={startIcon} size={FontSize.size3} color={variants[variant].text.color} />
      )}
      {isChildrenString ? (
        <ThemedText style={[buttonStyles.text, variants[variant].text]}>
          {children}
        </ThemedText>
      ) : (
        children
      )}
    </Pressable>
  );
};

export const buttonStyles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.size1,
    paddingBlock: 6,
    paddingInline: 14,
    borderRadius: Radius.full,
  },
  text: {
    fontWeight: FontWeight.bold,
  },
});
