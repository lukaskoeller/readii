import { StyleSheet } from "react-native";
import { Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { LinkList, LinkListProps } from "./LinkList";

export type LinkListCardProps = LinkListProps;

export function LinkListCard({ data }: LinkListCardProps) {
  const colorBackground3 = useThemeColor({}, "background3");

  return (
    <ThemedView style={[styles.list, { backgroundColor: colorBackground3 }]}>
      <LinkList data={data} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.size3,
    paddingInlineStart: Spacing.size4,
    borderRadius: Radius.size4,
  },
});
