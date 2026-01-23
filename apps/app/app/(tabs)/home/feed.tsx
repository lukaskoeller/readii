import { FlatList, Share, StyleSheet } from "react-native";
import { Spacing } from "@/constants/Sizes";
import {
  useFeed,
  useFolder,
  useMediaItem,
  useMediaSource,
} from "@/hooks/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import {
  Icon,
  Label,
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { getPreviewText } from "@/core/utils";
import { parse } from "parse5";
import { useRefresh } from "@/hooks/useRefresh";
import { getFeedData } from "@readii/parser";
import { Fragment } from "react";
import { FeedItem } from "@/components/FeedItem";

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
  const colorText = useThemeColor({}, "text");

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
            <FeedItem
              key={item.id}
              id={item.id}
              isRead={item.isRead}
              mediaSourceIconUrl={item.mediaSource.icon?.url}
              mediaSourceName={item.mediaSource.name}
              previewText={previewText}
              publishedAt={item.publishedAt}
              thumbnailUrl={item.thumbnailUrl}
              title={item.title}
            />
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
});
