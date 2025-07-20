import { StyleSheet } from "react-native";
import { Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { ListItem } from "./ListItem";
import { Link } from "expo-router";

export type LinkListCardProps = {
  data: {
    id: string;
    label: string;
    icon: React.JSX.Element;
  }[];
};

export function LinkListCard({ data }: LinkListCardProps) {
  const colorBackground3 = useThemeColor({}, "background3");

  return (
    <ThemedView style={[styles.list, { backgroundColor: colorBackground3 }]}>
      {data.map((item, idx, array) => (
        <Link
          key={item.id}
          href={{
            pathname: "/feed",
            params: { mediaSourceId: item.id },
          }}
        >
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

const styles = StyleSheet.create({
  list: {
    padding: Spacing.size3,
    borderRadius: Radius.size4,
  },
});
