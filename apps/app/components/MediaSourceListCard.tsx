import { FlatList, StyleSheet } from "react-native";
import { Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinkListProps } from "./LinkList";
import { Card } from "./Card";
import { ListItem, ListItemProps } from "./ListItem";
import { ThemedView } from "./ThemedView";
import { FC } from "react";
import { ThemedText } from "./ThemedText";
import { useLiveQuery } from "drizzle-orm/expo-sqlite/query";
import { useMediaItem } from "@/hooks/queries";
import { IconSymbol } from "./ui/IconSymbol";
import { Link } from "expo-router";
import * as schema from "@/core/schema";

export type MediaSourceListItemProps = ListItemProps & {
  mediaSourceId: number;
};

const MediaSourceListItem: FC<MediaSourceListItemProps> = ({
  label,
  icon,
  isLastItem,
  mediaSourceId,
}) => {
  const colorBackground = useThemeColor({}, "background");
  const colorText2 = useThemeColor({}, "text2");
  const { readMediaItemsIsUnreadCount } = useMediaItem();
  const { data: itemsCountIsUnread } = useLiveQuery(
    readMediaItemsIsUnreadCount([mediaSourceId]),
  );
  const unreadCount = itemsCountIsUnread[0]?.count;

  return (
    <ListItem
      label={label}
      icon={icon}
      isLastItem={isLastItem}
      slotRight={
        <ThemedView style={styles.right}>
          {unreadCount > 0 ? (
            <ThemedView
              style={[styles.unreadBadge, { backgroundColor: colorBackground }]}
            >
              <ThemedText type="small">{unreadCount}</ThemedText>
            </ThemedView>
          ) : null}
          <IconSymbol
            name="chevron.right"
            color={colorText2}
            size={Spacing.size3}
          />
        </ThemedView>
      }
    />
  );
};

export type LinkListCardProps = LinkListProps & {
  data: (LinkListProps["data"] & {
    mediaSourceId: schema.TMediaItem["mediaSourceId"];
  })[];
};

export function MediaSourceListCard({ data }: LinkListCardProps) {
  const colorBackground3 = useThemeColor({}, "background3");

  return (
    <Card
      padding={false}
      style={[styles.list, { backgroundColor: colorBackground3 }]}
    >
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({ item, index }) => (
          <Link key={item.id} href={item.href}>
            <MediaSourceListItem
              icon={item.icon}
              label={item.label}
              isLastItem={index === data.length - 1}
              mediaSourceId={item.mediaSourceId}
            />
          </Link>
        )}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.size3,
    paddingInlineStart: Spacing.size4,
  },
  right: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size2,
  },
  unreadBadge: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size1,
    paddingBlock: Spacing.size1 / 2,
    paddingInline: Spacing.size2,
    borderRadius: Radius.full,
  },
});
