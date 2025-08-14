import { FC } from "react";
import { ThemedTextInput, ThemedTextInputProps } from "./ThemedTextInput";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export type TextInputFieldProps = {
  label: string;
  inputProps?: ThemedTextInputProps;
};

export const TextInputField: FC<TextInputFieldProps> = (props) => {
  return (
    <ThemedView>
      <ThemedText>{props.label}</ThemedText>
      <ThemedTextInput {...props.inputProps} />
    </ThemedView>
  );
};
