import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { FontWeight, Radius } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";

export type ButtonVariant = "primary" | "text" | "secondary";

export type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
};

export const Button: FC<ButtonProps> = ({
  children,
  onPress,
  style,
  variant = "primary",
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
    paddingBlock: 6,
    paddingInline: 14,
    borderRadius: Radius.full,
  },
  text: {
    fontWeight: FontWeight.bold,
  },
});
