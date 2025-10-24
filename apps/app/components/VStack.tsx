import { FC } from "react";
import { ThemedView } from "./ThemedView";
import { StyleSheet, ViewProps } from "react-native";
import { Spacing } from "@/constants/Sizes";

export type VStackProps = {
  gap?: number;
  children: React.ReactNode;
  style?: ViewProps["style"];
};

export const VStack: FC<VStackProps> = ({ gap = Spacing.size8, children, style }) => {
  return (
    <ThemedView style={[styles.stack, { gap }, style]}>
      {children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  stack: {
    display: "flex",
    flexDirection: "column",
  },
});
