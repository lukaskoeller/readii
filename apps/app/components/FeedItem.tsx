import { Link } from "expo-router";
import { ThemedView } from "./ThemedView";
import { FC } from "react";
import { Image } from "expo-image";
import {
  FontSize,
  FontWeight,
  LineHeight,
  Radius,
  Spacing,
} from "@/constants/Sizes";
import {
  DateArg,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInYears,
} from "date-fns";
import { dayMonthYearFormat } from "@/core/utils";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TMediaItem, TMediaSource, TMediaSourceIcon } from "@/core/schema";
import { IconSymbol } from "./ui/IconSymbol";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

function formatShortRelative(date: DateArg<Date>) {
  const now = new Date();
  const years = differenceInYears(now, date);
  if (years > 0) return dayMonthYearFormat.format(new Date(date));
  const days = differenceInDays(now, date);
  if (days > 0) return `${days}d`;
  const hours = differenceInHours(now, date);
  if (hours > 0) return `${hours}h`;
  const minutes = differenceInMinutes(now, date);
  if (minutes > 0) return `${minutes}m`;
  return "now";
}

export type FeedItemProps = {
  id: NonNullable<TMediaItem["id"]>;
  isRead: TMediaItem["isRead"];
  mediaSourceIconUrl: TMediaSourceIcon["url"];
  mediaSourceName: TMediaSource["name"];
  previewText: string;
  publishedAt: TMediaItem["publishedAt"];
  thumbnailUrl: TMediaItem["thumbnailUrl"];
  title: TMediaItem["title"];
};

export const FeedItem: FC<FeedItemProps> = ({
  id,
  isRead,
  mediaSourceIconUrl,
  mediaSourceName,
  previewText,
  publishedAt,
  thumbnailUrl,
  title,
}) => {
  const colorBackground3 = useThemeColor({}, "background3");
  const colorText2 = useThemeColor({}, "text2");
  const colorPrimary = useThemeColor({}, "primary");

  return (
    <Link
      href={{
        pathname: "/[mediaItemId]",
        params: { mediaItemId: id },
      }}
    >
      <ThemedView style={[styles.item]}>
        <ThemedView>
          {thumbnailUrl ? (
            <Image
              style={styles.thumbnail}
              source={thumbnailUrl}
              contentFit="cover"
              transition={500}
            />
          ) : (
            <ThemedView
              style={[
                styles.thumbnail,
                {
                  backgroundColor: colorBackground3,
                },
              ]}
            >
              <IconSymbol
                size={Spacing.size5}
                name="photo"
                color={colorText2}
              />
            </ThemedView>
          )}
        </ThemedView>
        <View style={styles.desc}>
          <ThemedView style={styles.titleBar}>
            <ThemedText color="text" style={styles.title}>
              {title}
            </ThemedText>
            <ThemedView style={styles.meta}>
              {!isRead && (
                <ThemedView
                  style={[
                    styles.isUnreadDot,
                    { backgroundColor: colorPrimary },
                  ]}
                />
              )}
              <ThemedText type="small">
                {formatShortRelative(publishedAt)}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.publisher}>
            {mediaSourceIconUrl && (
              <Image
                style={styles.publisherThumbnail}
                source={mediaSourceIconUrl}
                contentFit="cover"
                transition={1000}
              />
            )}
            <ThemedText
              style={{ ...styles.publisherName, color: colorText2 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {mediaSourceName}
            </ThemedText>
          </ThemedView>

          <ThemedText
            numberOfLines={3}
            style={[styles.previewText, { color: colorText2 }]}
          >
            {previewText}
          </ThemedText>
        </View>
      </ThemedView>
    </Link>
  );
};

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    gap: Spacing.size4,
    paddingBlock: Spacing.size4,
  },
  desc: {
    flex: 1,
  },
  titleBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: Spacing.size2,
  },
  title: {
    flex: 1,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.size3,
  },
  publisher: {
    width: "100%",
    marginBlockEnd: Spacing.size1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size1,
  },
  publisherThumbnail: {
    width: Spacing.size4,
    height: Spacing.size4,
    borderRadius: Radius.size2,
  },
  publisherName: {
    flexShrink: 1,
    fontWeight: FontWeight.medium,
    fontSize: FontSize.size1,
  },
  text: {
    lineHeight: FontSize.size3 * 1.3,
  },
  header: {
    marginBlockStart: Spacing.size4,
    fontSize: FontSize.size1,
    textAlign: "right",
  },
  thumbnail: {
    width: Spacing.size9,
    height: Spacing.size9,
    borderRadius: Radius.size3,
    marginBlockStart: Spacing.size1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  meta: {
    marginBlockStart: Spacing.size1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.size1,
  },
  isUnreadDot: {
    width: Spacing.size2,
    height: Spacing.size2,
    borderRadius: Radius.full,
  },
  previewText: {
    fontWeight: FontWeight.normal,
    fontSize: FontSize.size1,
    lineHeight: LineHeight.size1,
  },
});
