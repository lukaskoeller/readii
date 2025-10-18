import { BlurEvent, StyleSheet, Switch } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { FontSize, Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ListItemSwitchProps = {
  label: string;
  icon: React.JSX.Element;
  isLastItem: boolean;
  onChange: (value: boolean) => void | Promise<void>;
  onBlur?: ((e: BlurEvent) => void) | null | undefined
  checked: boolean;
};

export function ListItemSwitch({
  label,
  icon,
  isLastItem,
  onChange,
  onBlur,
  checked,
}: ListItemSwitchProps) {
  const colorBorder = useThemeColor({}, "border");
  const colorNeutral2 = useThemeColor({}, "neutral2");
  const colorPrimary = useThemeColor({}, "primary");
  const colorBackground3 = useThemeColor({}, "background3");

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
          <Switch
            trackColor={{ false: colorNeutral2, true: colorPrimary }}
            thumbColor={checked ? colorBackground3 : colorBackground3}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onChange}
            onBlur={onBlur}
            value={checked}
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
