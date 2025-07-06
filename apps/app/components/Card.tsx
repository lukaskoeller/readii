import { Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";

export type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Card(props: CardProps) {
  const { style, children } = props;
  const colorBackground3 = useThemeColor({}, "background3");

  return (
    <ThemedView
      style={[styles.card, { backgroundColor: colorBackground3 }, style]}
      padding={Spacing.size3}
    >
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.size4,
  },
});
