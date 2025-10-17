import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./ui/IconSymbol";
import { FontSize, FontWeight, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link, LinkProps } from "expo-router";
import { CARD_STYLES } from "./Card";

export type QuickCardProps = {
  count: number;
  label: string;
  icon: typeof IconSymbol;
  href: LinkProps["href"];
};

export function QuickCardLink(props: QuickCardProps) {
  const { count, label, icon, href } = props;
  const Icon = icon;
  const colorText2 = useThemeColor({}, "text2");
  const colorPrimary = useThemeColor({}, "primary");
  const colorBackground3 = useThemeColor({}, "background3");

  return (
    <Link
      href={href}
      style={[styles.card, { backgroundColor: colorBackground3 }]}
    >
      <ThemedView style={styles.header}>
        <Icon
          size={28}
          name="app.badge"
          color={colorText2}
          style={{ flex: 1 }}
        />
        <ThemedText
          style={{ fontWeight: FontWeight.bold, fontSize: FontSize.size4 }}
        >
          {count}
        </ThemedText>
        <ThemedText style={[styles.label, { color: colorPrimary }]}>{label}</ThemedText>
      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: "40%",
    flex: 1,
    padding: Spacing.size3,
    gap: 0,
    ...CARD_STYLES,
  },
  header: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Spacing.size2,
    rowGap: Spacing.size2,
  },
  label: { width: "100%" },
});
