import { FC } from "react";
import { ThemedView } from "./ThemedView";
import { FontSize, Radius, Spacing } from "@/constants/Sizes";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Card } from "./Card";
import { Image } from "expo-image";

const THUMBNAIL_PREVIEW_COUNT = 4 as const;
const MAIN_PADDING = Spacing.size4;
const THUMBNAIL_BORDER_WIDTH = 2 as const;
const THUMBNAIL_BORDER_COMPENSATION = THUMBNAIL_BORDER_WIDTH * 2;
const FOOTER_ITEM_SIZE = Spacing.size5 + THUMBNAIL_BORDER_COMPENSATION;

export type FolderButtonProps = {
  label: string;
  icon?: React.JSX.Element;
  count?: number;
  thumbnailUrls: string[];
};

export const FolderButton: FC<FolderButtonProps> = (props) => {
  const { label, count, thumbnailUrls } = props;
  const colorBackground = useThemeColor({}, "background");
  const colorBackground3 = useThemeColor({}, "background3");
  const icon = props.icon ?? <IconSymbol name="folder" size={FontSize.size5} />;
  const additionalMediaSourcesCount =
    thumbnailUrls.length - THUMBNAIL_PREVIEW_COUNT;

  return (
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
            <IconSymbol
              name="chevron.right"
              color={colorBackground}
              size={Spacing.size3}
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.footer}>
        {thumbnailUrls.length > 0 && (
          <ThemedView style={styles.thumbnails}>
            {thumbnailUrls.slice(0, THUMBNAIL_PREVIEW_COUNT).map((url, idx) => (
              <ThemedView
                key={url}
                style={[
                  styles.thumbnail,
                  {
                    backgroundColor: colorBackground,
                    borderColor: colorBackground3,
                  },
                  idx === 0 && { marginInlineStart: 0 }
                ]}
              >
                <Image
                  source={{ uri: url }}
                  style={{ width: "100%", height: "100%" }}
                />
              </ThemedView>
            ))}
            {additionalMediaSourcesCount > 0 && (
              <ThemedView
                style={[
                  styles.thumbnailCount,
                  {
                    backgroundColor: colorBackground,
                    borderColor: colorBackground3,
                  },
                ]}
              >
                <ThemedText type="small">
                  {`+ ${additionalMediaSourcesCount}`}
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        )}
        <ThemedView style={styles.unreadBadge}>
          <IconSymbol name="app.badge" size={FOOTER_ITEM_SIZE - THUMBNAIL_BORDER_COMPENSATION} />
          <ThemedText type="small">{count ?? 0}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Card>
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
    justifyContent: "space-between",
    marginBlockEnd: MAIN_PADDING / 2,
  },
  thumbnails: {
    flexDirection: "row",
    gap: Spacing.size1,
  },
  thumbnail: {
    width: FOOTER_ITEM_SIZE,
    height: FOOTER_ITEM_SIZE,
    borderRadius: Radius.full,
    marginInlineStart: Spacing.size3 * -1,
    borderWidth: THUMBNAIL_BORDER_WIDTH,
    overflow: "hidden",
  },
  thumbnailCount: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: FOOTER_ITEM_SIZE,
    borderWidth: THUMBNAIL_BORDER_WIDTH,
    paddingInline: Spacing.size1,
    borderRadius: Radius.full,
    marginInlineStart: Spacing.size3 * -1,
  },
  unreadBadge: {
    paddingInlineEnd: MAIN_PADDING,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size1,
  }
});
