import { Link, LinkProps } from "expo-router";
import { ListItem } from "./ListItem";
import { ThemedView } from "./ThemedView";
import { ViewProps } from "react-native";

export type LinkListProps = {
  data: {
    id: string;
    label: string;
    icon: React.JSX.Element;
    href: LinkProps["href"];
  }[];
  style?: ViewProps["style"];
};

export function LinkList({ data, style }: LinkListProps) {
  return (
    <ThemedView style={style}>
      {data.map((item, idx, array) => (
        <Link key={item.id} href={item.href}>
          <ListItem
            label={item.label}
            icon={item.icon}
            isLastItem={idx === array.length - 1}
          />
        </Link>
      ))}
    </ThemedView>
  );
}
