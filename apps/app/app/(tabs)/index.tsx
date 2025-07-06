import { LinkListCard } from "@/components/LinkListCard";
import { QuickCardLink } from "@/components/QuickCardLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Spacing } from "@/constants/Sizes";
import { getFeed } from "@/core/data";
import { useFeed, useMediaItem, useMediaSource } from "@/hooks/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Image } from "expo-image";
import { XMLParser } from "fast-xml-parser";
import { Button, SafeAreaView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { createFeed } = useFeed();
  const { readMediaSources } = useMediaSource();
  const {
    readMediaItemsCount,
    readMediaItemsIsReadLaterCount,
    readMediaItemsIsStarredCount,
    readMediaItemsIsUnreadCount,
  } = useMediaItem();
  const { data } = useLiveQuery(readMediaSources());
  const { data: itemsCount } = useLiveQuery(readMediaItemsCount());
  const { data: itemsCountIsStarred } = useLiveQuery(readMediaItemsIsStarredCount());
  const { data: itemsCountIsReadLater } = useLiveQuery(readMediaItemsIsReadLaterCount());
  const { data: itemsCountIsUnread } = useLiveQuery(readMediaItemsIsUnreadCount());
  const itemsCountAll = itemsCount[0]?.count ?? 0;
  const itemsCountStarred = itemsCountIsStarred[0]?.count ?? 0;
  const itemsCountReadLater = itemsCountIsReadLater[0]?.count ?? 0;
  const itemsCountUnread = itemsCountIsUnread[0]?.count ?? 0;
  
  const colorText2 = useThemeColor({}, "text2");
  const colorPrimary = useThemeColor({}, "primary");

  return (
    <SafeAreaView>
      <ThemedView padding={Spacing.size4}>
        <ThemedText type="h1" style={{ marginBlockStart: 0 }}>Hey Luki.</ThemedText>
        <ThemedText style={{ marginBlockEnd: Spacing.size5 }}>Liebe ist wirklich ein Geschenk Gottes.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.quickFilters}>
        <QuickCardLink
          href={{
            pathname: "/feed",
          }}
          label="All"
          count={itemsCountAll}
          icon={() => (
            <IconSymbol size={28} name="app.badge" color={colorText2} />
          )}
        />
        <QuickCardLink
          href={{
            pathname: "/feed",
            params: { isUnread: "true" },
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
            params: { isStarred: "true" },
          }}
          label="Starred"
          count={itemsCountStarred}
          icon={() => <IconSymbol size={28} name="star" color={colorText2} />}
        />
        <QuickCardLink
          href={{
            pathname: "/feed",
            params: { isReadLater: "true" },
          }}
          label="Read Later"
          count={itemsCountReadLater}
          icon={() => (
            <IconSymbol size={28} name="clock.badge" color={colorText2} />
          )}
        />
      </ThemedView>
      <ThemedView padding={Spacing.size4}>
        <ThemedText type="h2">All feeds</ThemedText>
        <ThemedView>
          <LinkListCard
            data={data.map((item) => ({
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
        </ThemedView>
      </ThemedView>
      <Button
        onPress={async () => {
          const url = "https://nerdy.dev/rss.xml";
          const feed = await getFeed(url);
          if (!feed) {
            console.error("Failed to fetch feed");
            return;
          }
          const parser = new XMLParser({
            ignoreAttributes: false,
          });
          const feedObj = parser.parse(feed);
          const mediaSource = feedObj.rss.channel;
          console.log("MEDIA_SOURCE", mediaSource);

          if (!mediaSource || !Array.isArray(mediaSource.item)) {
            console.error("Invalid feed structure");
            return;
          }
          try {
            const args = {
              mediaSourceIcon: {
                title:
                  mediaSource.image.title ??
                  mediaSource.webMaster ??
                  mediaSource.title,
                url: mediaSource.image.url, // @todo: Fetch favicon as fallback
              },
              mediaSource: {
                name: mediaSource.title,
                description: mediaSource.description,
                url: mediaSource.link,
                feedUrl: mediaSource["atom:link"]["@_href"] ?? null,
                logoUrl: mediaSource.logo ?? null,
                lastBuildAt: mediaSource.lastBuildDate ?? null,
                lastFetchedAt: new Date().toISOString(),
                language: mediaSource.language ?? null,
                generator: mediaSource.generator ?? null,
              },
              mediaItems: mediaSource.item.map((item: any) => ({
                title: item.title,
                url: item.link,
                type: "text",
                content: item.description ?? null,
                creator: item["dc:creator"] ?? null,
                publishedAt: item.pubDate ?? null,
                enclosure: item.enclosure?.["@_url"] ?? null,
                thumbnail: item["media:thumbnail"]?.["@_url"] ?? null,
              })),
            };

            console.log("FEED ARGS", args);
            await createFeed(args);
          } catch (error) {
            console.log(error);
          }
        }}
        title="Add Feed"
        color={colorPrimary}
      />
    </SafeAreaView>
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
