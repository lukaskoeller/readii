import { Link, LinkProps } from "expo-router";
import { ListItem, ListItemProps } from "./ListItem";
import { ThemedView } from "./ThemedView";
import { FlatList, ViewProps } from "react-native";

export type LinkListProps = {
  data: (Omit<ListItemProps, "isLastItem"> & {
    id: string;
    href: LinkProps["href"];
  })[];
  style?: ViewProps["style"];
};

export function LinkList({ data, style }: LinkListProps) {
  return (
    <ThemedView style={style}>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({ item, index }) => (
          <Link key={item.id} href={item.href}>
            <ListItem
              label={item.label}
              icon={item.icon}
              isLastItem={index === data.length - 1}
            />
          </Link>
        )}
      />
    </ThemedView>
  );
}
