import { FlatListProps, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { Spacing } from "@/constants/Sizes";

export type TwoGridProps<ItemT> = {
  data: ItemT[];
  renderItem: (item: ItemT) => React.ReactNode;
  keyExtractor: (item: ItemT) => string;
  style?: FlatListProps<ItemT>["style"];
};

export const TwoGrid = <ItemT,>(props: TwoGridProps<ItemT>) => {
  const { data, renderItem, keyExtractor, style } = props;

  return (
    <ThemedView style={[styles.container, style]}>
      {data.map((item) => (
        <ThemedView
          style={{ width: "40%", flexGrow: 1 }}
          key={keyExtractor(item)}
        >
          {renderItem(item)}
        </ThemedView>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.size3,
  },
});
