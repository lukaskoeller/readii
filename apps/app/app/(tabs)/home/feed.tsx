import { FlatList, Share, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontSize, FontWeight, Radius, Spacing } from "@/constants/Sizes";
import {
  useFeed,
  useFolder,
  useMediaItem,
  useMediaSource,
} from "@/hooks/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Image } from "expo-image";
import {
  Icon,
  Label,
  Link,
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { dayMonthYearFormat, getPreviewText } from "@/core/utils";
import { parse } from "parse5";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInYears,
  DateArg,
} from "date-fns";
import { useRefresh } from "@/hooks/useRefresh";
import { getFeedData } from "@readii/parser";
import { Fragment } from "react";

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

export default function Feed() {
  const router = useRouter();
  const { deleteMediaSource } = useMediaSource();
  const { deleteFolder } = useFolder();
  const { updateFeed } = useFeed();
  const { readMediaItems, readMediaItemsFromFolderId, updateIsReadMediaItems } =
    useMediaItem();
  const params = useLocalSearchParams<{
    isReadLater?: "true" | "false";
    isStarred?: "true" | "false";
    isUnread?: "true" | "false";
    feedTitle: string;
    mediaSourceId?: `${number}`;
    feedUrl?: string;
    folderId?: `${number}`;
  }>();
  const folderId = params.folderId ? Number(params.folderId) : undefined;
  const hasFolderId = typeof folderId === "number";
  const { refreshing, handleRefresh } = useRefresh(async () => {
    const minWait = new Promise((resolve) => setTimeout(resolve, 1000));
    if (!params.feedUrl) return;
    const args = await getFeedData(params.feedUrl);
    await updateFeed(args);
    await minWait;
  });
  const mediaSourceId = params.mediaSourceId
    ? Number(params.mediaSourceId)
    : undefined;
  const { data } = useLiveQuery(
    hasFolderId ? readMediaItemsFromFolderId(folderId) : readMediaItems(params),
  );
  const backgroundColor = useThemeColor({}, "background");
  const colorBackground3 = useThemeColor({}, "background3");
  const colorText = useThemeColor({}, "text");
  const colorText2 = useThemeColor({}, "text2");

  return (
    <Fragment>
      <Stack.Screen.Title style={{ color: colorText }}>
        {params.feedTitle ?? `All Feeds (${data?.length ?? 0})`}
      </Stack.Screen.Title>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Menu icon="ellipsis">
          <Stack.Toolbar.MenuAction
            disabled={!mediaSourceId}
            onPress={() => {
              if (!mediaSourceId) return;
              updateIsReadMediaItems(true, mediaSourceId);
            }}
          >
            <Label>Mark All Read</Label>
            <Icon sf="app.badge" md="mark_chat_unread" />
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction
            disabled={!params.feedUrl}
            onPress={async () => {
              if (!params.feedUrl) return;
              await Share.share({
                // message: `Check out this feed I found on readii:\n${params.feedUrl}\n\nGet the app here:\nhttps://readii.de`,
                url: params.feedUrl,
              });
            }}
          >
            <Label>Share Feed</Label>
            <Icon sf="square.and.arrow.up" md="ios_share" />
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.Spacer width={100} />
          <Stack.Toolbar.MenuAction
            destructive
            onPress={async () => {
              if (mediaSourceId) {
                deleteMediaSource(mediaSourceId);
              }
              if (folderId) {
                deleteFolder(folderId);
              }
              router.replace("/home");
            }}
          >
            <Label>{mediaSourceId ? "Delete Feed" : "Delete Folder"}</Label>
            <Icon sf="trash" md="delete" />
          </Stack.Toolbar.MenuAction>
        </Stack.Toolbar.Menu>
      </Stack.Toolbar>
      <FlatList
        style={[styles.list, { backgroundColor }]}
        contentContainerStyle={{ paddingBottom: Spacing.navigation }}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        data={data}
        renderItem={({ item }) => {
          const contentAst = parse(item?.content || "");
          const previewText = getPreviewText(contentAst);
          return (
            <Link
              href={{
                pathname: "/home/[mediaItemId]",
                params: { mediaItemId: item.id },
              }}
            >
              <ThemedView style={styles.item}>
                <ThemedView>
                  {item.thumbnailUrl ? (
                    <Image
                      style={styles.thumbnail}
                      source={item.thumbnailUrl}
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
                      {item.title}
                    </ThemedText>
                    <ThemedText type="small">
                      {formatShortRelative(item.publishedAt)}
                    </ThemedText>
                  </ThemedView>

                  <ThemedView style={styles.publisher}>
                    {item.mediaSource.icon?.url && (
                      <Image
                        style={styles.publisherThumbnail}
                        source={item.mediaSource.icon?.url}
                        contentFit="cover"
                        transition={1000}
                      />
                    )}
                    <Text
                      style={{ ...styles.publisherName, color: colorText2 }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.mediaSource.name}
                    </Text>
                  </ThemedView>

                  <ThemedText
                    numberOfLines={3}
                    style={{ ...styles.text, color: colorText2 }}
                  >
                    {previewText}
                  </ThemedText>
                </View>
              </ThemedView>
            </Link>
          );
        }}
        keyExtractor={(item) => String(item.id)}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.size4,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    gap: Spacing.size4,
    paddingBlock: Spacing.size4,
  },
  desc: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
    marginBlockEnd: Spacing.size1,
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
  publisher: {
    width: "100%",
    height: Spacing.size4,
    marginBlockStart: Spacing.size1,
    marginBlockEnd: Spacing.size2,
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
  publishedAt: {
    fontWeight: FontWeight.medium,
    fontSize: FontSize.size1,
  },
});
