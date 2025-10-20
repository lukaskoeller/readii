import { FC } from "react";
import { ThemedView } from "./ThemedView";
import { FontSize, Radius, Spacing } from "@/constants/Sizes";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Card } from "./Card";
import { Image } from "expo-image";
import { Link, LinkProps } from "expo-router";
import { useLiveQuery } from "drizzle-orm/expo-sqlite/query";
import { useMediaItem } from "@/hooks/queries";
import * as schema from "@/core/schema";

const THUMBNAIL_PREVIEW_COUNT = 4 as const;
const MAIN_PADDING = Spacing.size4;
const THUMBNAIL_BORDER_WIDTH = 2 as const;
const THUMBNAIL_BORDER_COMPENSATION = THUMBNAIL_BORDER_WIDTH * 2;
const FOOTER_ITEM_SIZE = Spacing.size4 + THUMBNAIL_BORDER_COMPENSATION;

export type FolderButtonProps = {
  label: string;
  icon?: React.JSX.Element;
  count?: number;
  mediaSources: {
    thumbnailUrl: schema.TMediaItem["thumbnailUrl"];
    id: NonNullable<schema.TMediaItem["mediaSourceId"]>;
  }[];
  href: LinkProps["href"];
};

export const FolderButton: FC<FolderButtonProps> = (props) => {
  const { label, mediaSources, href } = props;
  const colorBackground = useThemeColor({}, "background");
  const colorBackground3 = useThemeColor({}, "background3");
  const colorText2 = useThemeColor({}, "text2");
  const icon = props.icon ?? <IconSymbol name="folder" size={FontSize.size5} />;
  const additionalMediaSourcesCount =
    mediaSources.length - THUMBNAIL_PREVIEW_COUNT;
    
  const { readMediaItemsIsUnreadCount } = useMediaItem();
  const { data: itemsCountIsUnread } = useLiveQuery(
    readMediaItemsIsUnreadCount(mediaSources.map(({ id }) => id))
  );
  const mediaItemsUnreadCount = itemsCountIsUnread[0]?.count;

  return (
    <Link href={href}>
      <Card padding={false} style={styles.card}>
        <ThemedView style={[styles.item]}>
          <ThemedView style={[styles.icon]}>{icon}</ThemedView>
          <ThemedView style={[styles.row]}>
            <ThemedText
              numberOfLines={1}
              style={styles.text}
              ellipsizeMode="tail"
            >
              {label}
            </ThemedText>
            <ThemedView style={styles.right}>
              {mediaItemsUnreadCount && (
                <ThemedView
                  style={[
                    styles.unreadBadge,
                    { backgroundColor: colorBackground },
                  ]}
                >
                  <ThemedText type="small">{mediaItemsUnreadCount}</ThemedText>
                </ThemedView>
              )}
              <IconSymbol
                name="chevron.right"
                color={colorText2}
                size={Spacing.size3}
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.footer}>
          {mediaSources.length > 0 && (
            <ThemedView style={styles.thumbnails}>
              {mediaSources
                .slice(0, THUMBNAIL_PREVIEW_COUNT)
                .map(({ thumbnailUrl, id }, idx) => (
                  <ThemedView
                    key={id}
                    style={[
                      styles.thumbnail,
                      {
                        backgroundColor: colorBackground,
                        outlineColor: colorBackground3,
                      },
                      idx === 0 && { marginInlineStart: 0 },
                    ]}
                  >
                    {thumbnailUrl ? (
                      <Image
                        source={{ uri: thumbnailUrl }}
                        style={{ width: "100%", height: "100%" }}
                        contentFit="contain"
                      />
                    ) : (
                      <IconSymbol
                        name="photo"
                        size={FontSize.size1}
                        color={colorText2}
                      />
                    )}
                  </ThemedView>
                ))}
              {additionalMediaSourcesCount > 0 && (
                <ThemedView
                  style={[
                    styles.thumbnailCount,
                    {
                      backgroundColor: colorBackground,
                      outlineColor: colorBackground,
                    },
                  ]}
                >
                  <ThemedText type="small">
                    {`+${additionalMediaSourcesCount}`}
                  </ThemedText>
                </ThemedView>
              )}
            </ThemedView>
          )}
        </ThemedView>
      </Card>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.size3,
    paddingInlineStart: MAIN_PADDING,
  },
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
    paddingBlock: MAIN_PADDING,
    paddingInlineEnd: MAIN_PADDING,
    flexGrow: 1,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  text: {
    flexShrink: 1,
    paddingInlineEnd: Spacing.size2,
  },
  right: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size2,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size5,
    marginInlineEnd: MAIN_PADDING,
    justifyContent: "flex-start",
    marginBlockEnd: MAIN_PADDING,
    borderBlockStartColor: "lightgray",
  },
  thumbnails: {
    flexDirection: "row",
    gap: Spacing.size1,
  },
  thumbnail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: FOOTER_ITEM_SIZE,
    height: FOOTER_ITEM_SIZE,
    borderRadius: Radius.full,
    marginInlineStart: 10 * -1,
    outlineWidth: THUMBNAIL_BORDER_WIDTH,
    overflow: "hidden",
  },
  thumbnailCount: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: FOOTER_ITEM_SIZE,
    outlineWidth: THUMBNAIL_BORDER_WIDTH,
    paddingInline: Spacing.size3 / 2,
    borderRadius: Radius.full,
    marginInlineStart: 10 * -1,
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
