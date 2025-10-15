import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { FontSize, Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconSymbol } from "./ui/IconSymbol";

export type ListItemProps = {
  label: string;
  icon: React.JSX.Element;
  isLastItem: boolean;
  slotRight?: React.JSX.Element;
};

export function ListItem(props: ListItemProps) {
  const { label, icon, isLastItem } = props;
  const colorBorder = useThemeColor({}, "border");
  const colorBackground = useThemeColor({}, "text2");
  const slotRight = props.slotRight ?? (
    <IconSymbol
      name="chevron.right"
      color={colorBackground}
      size={Spacing.size3}
    />
  );

  return (
    <ThemedView style={[styles.item]}>
      <ThemedView style={[styles.icon]}>{icon}</ThemedView>
      <ThemedView
        style={[
          styles.row,
          { borderBlockEndColor: colorBorder },
          isLastItem ? styles.lastRow : undefined,
        ]}
      >
        <ThemedText numberOfLines={1} style={styles.text} ellipsizeMode="tail">
          {label}
        </ThemedText>
        <ThemedView>
          {slotRight}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: FontSize.size5,
    height: FontSize.size5,
    borderRadius: Radius.size3,
    overflow: "hidden",
  },
  item: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size3,
  },
  row: {
    flexShrink: 1,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBlock: Spacing.size4,
    paddingInlineEnd: Spacing.size4,
    flexGrow: 1,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  text: {
    flexShrink: 1,
    paddingInlineEnd: Spacing.size2,
  },
});
