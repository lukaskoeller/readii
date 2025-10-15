import { Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";

export type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number | false;
};

export function Card(props: CardProps) {
  const { style, children, padding = Spacing.size3 } = props;
  const colorBackground3 = useThemeColor({}, "background3");

  return (
    <ThemedView
      style={[styles.card, { backgroundColor: colorBackground3 }, style]}
      padding={padding || undefined}
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
