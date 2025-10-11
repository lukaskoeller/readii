import { ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinkListCard } from "@/components/LinkListCard";
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
import { useEffect } from "react";
import { getFeedData } from "@readii/parser";
import { TMediaSource } from "@/core/schema";

export default function HomeScreen() {
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
    readMediaItemsIsStarredCount()
  );
  const { data: itemsCountIsReadLater } = useLiveQuery(
    readMediaItemsIsReadLaterCount()
  );
  const { data: itemsCountIsUnread } = useLiveQuery(
    readMediaItemsIsUnreadCount()
  );
  const itemsCountAll = itemsCount[0]?.count ?? 0;
  const itemsCountStarred = itemsCountIsStarred[0]?.count ?? 0;
  const itemsCountReadLater = itemsCountIsReadLater[0]?.count ?? 0;
  const itemsCountUnread = itemsCountIsUnread[0]?.count ?? 0;

  const colorBackground = useThemeColor({}, "background");
  const colorText2 = useThemeColor({}, "text2");

  // @todo Improve update on mount
  useEffect(() => {
    const updateFeeds = async (
      mediaSourceFeedURLs: TMediaSource["feedUrl"][]
    ) => {
      await Promise.all(
        mediaSourceFeedURLs.map(async (url) => {
          const args = await getFeedData(url);
          await updateFeed(args);
        })
      );
    };
    if (Array.isArray(data) && data.length > 0) {
      const mediaSourceFeedURLs = data.map((mediaSource) => {
        return mediaSource.feedUrl;
      });

      console.log("UPDATE FEEDS", mediaSourceFeedURLs);

      updateFeeds(mediaSourceFeedURLs);
    }
  }, [data.length]);

  return (
    <>
      <ScrollView
        style={{
          paddingBlockStart: Spacing.size4,
          backgroundColor: colorBackground,
        }}
      >
        <ThemedView style={styles.quickFilters}>
          <QuickCardLink
            href={{
              pathname: "/home/feed",
            }}
            label="All"
            count={itemsCountAll}
            icon={() => (
              <IconSymbol size={28} name="house" color={colorText2} />
            )}
          />
          <QuickCardLink
            href={{
              pathname: "/home/feed",
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
              pathname: "/home/feed",
              params: { isStarred: "true", feedTitle: "Starred" },
            }}
            label="Starred"
            count={itemsCountStarred}
            icon={() => <IconSymbol size={28} name="star" color={colorText2} />}
          />
          <QuickCardLink
            href={{
              pathname: "/home/feed",
              params: { isReadLater: "true", feedTitle: "Read Later" },
            }}
            label="Read Later"
            count={itemsCountReadLater}
            icon={() => (
              <IconSymbol size={28} name="clock.badge" color={colorText2} />
            )}
          />
        </ThemedView>
        {folders.map((folder) => (
          <ThemedView padding={Spacing.size4} key={folder.id}>
            <Section title={folder.name}>
              <LinkListCard
                data={folder.mediaSources.map(({ mediaSource }) => ({
                  href: {
                    pathname: "/home/feed",
                    params: {
                      mediaSourceId: mediaSource.id,
                      feedTitle: mediaSource.name,
                      feedUrl: mediaSource.feedUrl,
                    },
                  },
                  id: String(mediaSource.id),
                  label: mediaSource.name,
                  icon: (
                    <Image
                      style={styles.thumbnail}
                      source={mediaSource.icon?.url}
                      contentFit="cover"
                      transition={500}
                    />
                  ),
                }))}
              />
            </Section>
          </ThemedView>
        ))}
        <ThemedView padding={Spacing.size4}>
          <Section title="All Feeds">
            <LinkListCard
              data={data.map((item) => ({
                href: {
                  pathname: "/home/feed",
                  params: {
                    mediaSourceId: item.id,
                    feedTitle: item.name,
                    feedUrl: item.feedUrl,
                  },
                },
                id: String(item.id),
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
    </>
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
