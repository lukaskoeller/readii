import { Spacing } from "@/constants/Sizes";
import { FlatList, FlatListProps, StyleSheet, View } from "react-native";

export type GalleryProps<ItemT> = {
  data: FlatListProps<ItemT>["data"];
  renderItem: FlatListProps<ItemT>["renderItem"];
  keyExtractor?: FlatListProps<ItemT>["keyExtractor"];
  style?: FlatListProps<ItemT>["style"];
};

export const Gallery = <ItemT,>(props: GalleryProps<ItemT>) => {
  const { data, renderItem, keyExtractor, style } = props;

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => (
        <View style={{ width: Spacing.container / 2 }} />
      )}
      keyExtractor={keyExtractor}
      style={[styles.gallery, style]}
    />
  );
};

const styles = StyleSheet.create({
  gallery: {
    width: "100%",
    paddingInlineStart: Spacing.container,
    paddingInlineEnd: Spacing.container,
  },
});
