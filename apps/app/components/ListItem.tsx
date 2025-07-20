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
};

export function ListItem({ label, icon, isLastItem }: ListItemProps) {
  const colorBorder = useThemeColor({}, "background");
  const colorBackground3 = useThemeColor({}, "background2");

  return (
    <ThemedView style={[styles.item]}>
      <ThemedView
        style={[
          styles.icon,
          {
            backgroundColor: colorBackground3,
          },
        ]}
      >
        {icon}
      </ThemedView>
      <ThemedView
        style={[
          styles.row,
          { borderBlockEndColor: colorBorder },
          isLastItem ? styles.lastRow : undefined,
        ]}
      >
        <ThemedView>
          <ThemedText numberOfLines={1} style={styles.text}>
            {label}
          </ThemedText>
        </ThemedView>
        <ThemedView>
          <IconSymbol
            name="chevron.right"
            color={colorBorder}
            size={Spacing.size5}
          />
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size3,
    paddingInlineStart: Spacing.size4,
  },
  row: {
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
    // flexGrow: 1,
  },
});
