import { FC } from "react";
import { ThemedTextInput, ThemedTextInputProps } from "./ThemedTextInput";
import { ThemedView } from "./ThemedView";
import { ThemedText, ThemedTextProps } from "./ThemedText";
import { StyleSheet } from "react-native";
import { FontSize, Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TStatus } from "@/constants/Colors";

export type TextInputFieldProps = {
  label: string;
  inputProps?: ThemedTextInputProps;
  labelProps?: ThemedTextProps;
  helper?: {
    text?: string;
    status: TStatus;
  };
};

export const TextInputField: FC<TextInputFieldProps> = (props) => {
  const colorBackground2 = useThemeColor({}, "background2");
  const colorBorder = useThemeColor({}, "border");
  const style = props.inputProps?.style;

  return (
    <ThemedView>
      <ThemedText {...props.labelProps}>{props.label}</ThemedText>
      <ThemedTextInput
        {...props.inputProps}
        style={[
          styles.input,
          { backgroundColor: colorBackground2, borderColor: colorBorder },
          ...(Array.isArray(style) ? style : [style]),
        ]}
      />
      {props?.helper?.text && (
        <ThemedText
          type="smallStrong"
          color={props.helper.status}
          style={{ marginTop: Spacing.size1 }}
        >
          {props.helper.text}
        </ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: Radius.size3,
    paddingInline: Spacing.size3,
    paddingBlock: Spacing.size4,
    fontSize: FontSize.size3,
    width: "100%",
    borderWidth: 1.5,
  },
});
