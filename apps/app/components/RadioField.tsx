import { FC } from "react";
import { VStack } from "./VStack";
import { ThemedText, ThemedTextProps } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { FontSize, Radius, Spacing } from "@/constants/Sizes";
import { Pressable, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconSymbol } from "./ui/IconSymbol";

export type RadioOption = {
  label: string;
  value: string;
  description?: string;
};

export type RadioFieldProps = {
  options: RadioOption[];
  labelProps?: ThemedTextProps;
  onChange?: (option: RadioOption["value"]) => void;
  value?: RadioOption["value"];
};

export const RadioField: FC<RadioFieldProps> = ({
  options,
  labelProps,
  onChange,
  value,
}) => {
  const primaryColor = useThemeColor({}, "primary");
  const borderColor = useThemeColor({}, "border");

  return (
    <ThemedView>
      <ThemedText {...labelProps}>View Mode</ThemedText>
      <VStack gap={Spacing.size2}>
        {options.map((option) => {
          const isChecked = option.value === value;
          return (
            <Pressable
              style={[styles.radio, { borderColor }]}
              key={option.label}
              onPress={() => onChange?.(option.value)}
            >
              <ThemedView style={{ flexShrink: 1 }}>
                <ThemedText color="text">{option.label}</ThemedText>
                <ThemedText type="small">{option.description}</ThemedText>
              </ThemedView>
              <ThemedView>
                <IconSymbol
                  size={FontSize.size7}
                  name={
                    isChecked ? "checkmark.circle.fill" : "checkmark.circle"
                  }
                  color={isChecked ? primaryColor : undefined}
                />
              </ThemedView>
            </Pressable>
          );
        })}
      </VStack>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  radio: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    gap: Spacing.size6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: Radius.size5,
    paddingInline: Spacing.size3,
    paddingBlock: Spacing.size4,
    borderWidth: 1.5,
  },
});
