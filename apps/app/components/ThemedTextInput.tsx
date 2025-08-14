import { useThemeColor } from "@/hooks/useThemeColor";
import { FC } from "react";
import { TextInput, TextInputProps } from "react-native";

export type ThemedTextInputProps = TextInputProps;

export const ThemedTextInput: FC<ThemedTextInputProps> = (props) => {
  const colorText = useThemeColor({}, "text");
  return <TextInput {...props} style={[props.style, { color: colorText }]} />;
};
