import { FlatList, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { MediaSourceListCard } from "@/components/MediaSourceListCard";
import { QuickCardLink } from "@/components/QuickCardLink";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Spacing } from "@/constants/Sizes";
import {
  useFeed,
  useFolder,
  useMediaItem,
  useMediaSource,
} from "@/hooks/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Section } from "@/components/Section";
import { Fragment, useEffect } from "react";
import { getFeedData } from "@readii/parser";
import { TMediaSource } from "@/core/schema";
import { FolderButton } from "@/components/FolderButton";
import { Icon, Label, Stack, useRouter } from "expo-router";
import { Logo } from "@/components/Logo";

export default function HomeScreen() {
  const router = useRouter();
  const { updateFeed } = useFeed();
  const { readFolders } = useFolder();
  const { data: folders } = useLiveQuery(readFolders());

  const { readMediaSources } = useMediaSource();
  const {
    readMediaItemsCount,
    readMediaItemsIsReadLaterCount,
    readMediaItemsIsStarredCount,
    readMediaItemsIsUnreadCount,
  } = useMediaItem();
  const { data } = useLiveQuery(readMediaSources());
  const { data: itemsCount } = useLiveQuery(readMediaItemsCount());
  const { data: itemsCountIsStarred } = useLiveQuery(
    readMediaItemsIsStarredCount(),
  );
  const { data: itemsCountIsReadLater } = useLiveQuery(
    readMediaItemsIsReadLaterCount(),
  );
  const { data: itemsCountIsUnread } = useLiveQuery(
    readMediaItemsIsUnreadCount(),
  );
  const itemsCountAll = itemsCount[0]?.count ?? 0;
  const itemsCountStarred = itemsCountIsStarred[0]?.count ?? 0;
  const itemsCountReadLater = itemsCountIsReadLater[0]?.count ?? 0;
  const itemsCountUnread = itemsCountIsUnread[0]?.count ?? 0;

  const backgroundColor = useThemeColor({}, "background");
  const colorText = useThemeColor({}, "text");
  const colorText2 = useThemeColor({}, "text2");

  // @todo Improve update on mount
  useEffect(() => {
    const updateFeeds = async (
      mediaSourceFeedURLs: TMediaSource["feedUrl"][],
    ) => {
      await Promise.all(
        mediaSourceFeedURLs.map(async (url) => {
          const args = await getFeedData(url);
          await updateFeed(args);
        }),
      );
    };
    if (Array.isArray(data) && data.length > 0) {
      const mediaSourceFeedURLs = data.map((mediaSource) => {
        return mediaSource.feedUrl;
      });

      updateFeeds(mediaSourceFeedURLs);
    }
  }, [data.length]);

  return (
    <Fragment>
      <Stack.Screen
        options={{
          contentStyle: {
            backgroundColor,
          },
        }}
      >
        <Stack.Header style={{ backgroundColor }} />
        <Stack.Screen.Title style={{ color: colorText }} asChild>
          <Logo />
        </Stack.Screen.Title>
        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Button
            onPress={() => {
              router.navigate("/profile")
            }}
          >
            <Label>Profile</Label>
            <Icon sf="person.crop.circle" md="person" />
          </Stack.Toolbar.Button>
        </Stack.Toolbar>
      </Stack.Screen>
      <ScrollView
        style={{
          paddingBlockStart: Spacing.size4,
          backgroundColor: backgroundColor,
        }}
      >
        <ThemedView style={styles.quickFilters}>
          <QuickCardLink
            href={{
              pathname: "/feed",
            }}
            label="All"
            count={itemsCountAll}
            icon={() => (
              <IconSymbol size={28} name="house" color={colorText2} />
            )}
          />
          <QuickCardLink
            href={{
              pathname: "/feed",
              params: { isRead: "false", feedTitle: "Unread" },
            }}
            label="Unread"
            count={itemsCountUnread}
            icon={() => (
              <IconSymbol size={28} name="app.badge" color={colorText2} />
            )}
          />
          <QuickCardLink
            href={{
              pathname: "/feed",
              params: { isStarred: "true", feedTitle: "Starred" },
            }}
            label="Starred"
            count={itemsCountStarred}
            icon={() => <IconSymbol size={28} name="star" color={colorText2} />}
          />
          <QuickCardLink
            href={{
              pathname: "/feed",
              params: { isReadLater: "true", feedTitle: "Read Later" },
            }}
            label="Read Later"
            count={itemsCountReadLater}
            icon={() => (
              <IconSymbol size={28} name="clock.badge" color={colorText2} />
            )}
          />
        </ThemedView>
        {folders && folders.length !== 0 && (
          <ThemedView padding={Spacing.size4}>
            <Section title="Folders">
              <FlatList
                scrollEnabled={false}
                data={folders ?? []}
                ItemSeparatorComponent={() => (
                  <ThemedView style={{ height: Spacing.size3 }} />
                )}
                renderItem={({ item: folder }) => {
                  const mediaSources = folder.mediaSources.map(
                    ({ mediaSource }) => {
                      return {
                        thumbnailUrl: mediaSource.icon?.url,
                        id: mediaSource.id,
                      };
                    },
                  );
                  const folderId = folder.id;
                  return (
                    <FolderButton
                      key={folder.id}
                      href={{
                        pathname: "/feed",
                        params: { folderId: folderId, feedTitle: folder.name },
                      }}
                      label={folder.name}
                      count={folder.mediaSources.length}
                      mediaSources={mediaSources}
                    />
                  );
                }}
              />
            </Section>
          </ThemedView>
        )}
        <ThemedView padding={Spacing.size4}>
          <Section title={`All Feeds (${data.length})`}>
            <MediaSourceListCard
              data={data.map((item) => ({
                href: {
                  pathname: "/feed",
                  params: {
                    mediaSourceId: item.id,
                    feedTitle: item.name,
                    feedUrl: item.feedUrl,
                    viewMode: item.viewMode,
                  },
                },
                id: String(item.id),
                mediaSourceId: item.id,
                label: item.name,
                icon: (
                  <Image
                    style={styles.thumbnail}
                    source={item.icon?.url}
                    contentFit="cover"
                    transition={500}
                  />
                ),
              }))}
            />
          </Section>
        </ThemedView>
      </ScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  quickFilters: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.size3,
    paddingInline: Spacing.size4,
  },
  link: {
    flex: 1,
    backgroundColor: "gray",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
});
