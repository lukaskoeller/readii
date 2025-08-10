import { FlatList, FlatListProps } from "react-native";

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
      keyExtractor={keyExtractor}
      style={style}
    />
  );
};
