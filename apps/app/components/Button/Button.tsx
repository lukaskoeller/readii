import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { FontSize, FontWeight, Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import { IconSymbol, IconSymbolName } from "../ui/IconSymbol";

export type ButtonVariant = "primary" | "text" | "secondary" | "outline";

export type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onPress: () => void;
  size?: "small" | "medium" | "large";
  style?: object;
  startIcon?: IconSymbolName;
};

export const Button: FC<ButtonProps> = ({
  children,
  onPress,
  style,
  size = "medium",
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
    outline: {
      button: {
        borderWidth: 1,
        borderColor: colorPrimary,
      },
      text: { color: colorPrimary },
    },
  } as const satisfies Record<
    ButtonVariant,
    { text: Record<string, unknown>; button: Record<string, unknown> }
  >;

  const sizes = {
    small: {
      button: {
        paddingBlock: 2,
        paddingInline: 10,
      },
      text: {
        fontWeight: FontWeight.medium,
        fontSize: FontSize.size2,
      },
    },
    medium: {
      button: {
        paddingBlock: 6,
        paddingInline: 14,
      },
      text: {
        fontWeight: FontWeight.bold,
        fontSize: FontSize.size3,
      },
    },
    large: {
      button: {
        paddingBlock: 6,
        paddingInline: 14,
      },
      text: {
        fontWeight: FontWeight.bold,
        fontSize: FontSize.size3,
      },
    },
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        style,
        buttonStyles.button,
        variants[variant].button,
        sizes[size].button,
      ]}
    >
      {startIcon && (
        <IconSymbol
          name={startIcon}
          size={sizes[size].text.fontSize}
          color={variants[variant].text.color}
        />
      )}
      {isChildrenString ? (
        <ThemedText
          style={[buttonStyles.text, variants[variant].text, sizes[size].text]}
        >
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
    borderRadius: Radius.full,
  },
});
