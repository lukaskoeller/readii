import { FC } from "react";
import { ThemedText } from "./ThemedText";
import { TStatus } from "@/constants/Colors";
import { Spacing } from "@/constants/Sizes";

export type HelperTextProps = {
  text: string;
  status: TStatus;
};

export const HelperText: FC<HelperTextProps> = ({ text, status }) => {
  return (
    <ThemedText
      type="small"
      color={status}
      style={{ marginTop: Spacing.size1 }}
    >
      {text}
    </ThemedText>
  );
};
