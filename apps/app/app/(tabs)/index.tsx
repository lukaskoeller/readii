import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { FontSize, FontWeight, Spacing } from "@/constants/Sizes";
import { getFeed } from "@/core/data";
import { useFeed } from "@/hooks/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { XMLParser } from "fast-xml-parser";
import { Button, SafeAreaView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { createFeed } = useFeed();
  const colorText2 = useThemeColor({}, "text2");
  const colorPrimary = useThemeColor({}, "primary");

  return (
    <SafeAreaView>
      <ThemedView style={styles.kpis} padding={16}>
        <Card style={styles.card}>
          <ThemedView style={styles.header}>
            <IconSymbol size={28} name="app.badge" color={colorText2} />
            <ThemedText style={{ fontWeight: FontWeight.bold, fontSize: FontSize.size4 }}>7</ThemedText>
          </ThemedView>
          <ThemedText>Unread</ThemedText>
        </Card>
        <Card style={styles.card}>
          <ThemedView style={styles.header}>
            <IconSymbol size={28} name="star" color={colorText2} />
            <ThemedText style={{ fontWeight: FontWeight.bold, fontSize: FontSize.size4 }}>24</ThemedText>
          </ThemedView>
          <ThemedText>Starred</ThemedText>
        </Card>
        <Card style={styles.card}>
          <ThemedView style={styles.header}>
            <IconSymbol size={28} name="clock.badge" color={colorText2} />
            <ThemedText style={{ fontWeight: FontWeight.bold, fontSize: FontSize.size4 }}>4</ThemedText>
          </ThemedView>
          <ThemedText>Read Later</ThemedText>
        </Card>
        <ThemedView
          style={{ ...styles.card, visibility: "hidden" }}
          aria-hidden
        >
          {null}
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
                title: mediaSource.image.title ?? mediaSource.webMaster ?? mediaSource.title,
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
            
            console.log("THUMBNAIL", args);
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
  kpis: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
    gap: Spacing.size3,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.size2,
    flexGrow: 1,
    width: "47%", // Adjust width to fit two cards per row incl. gap
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.size2,
    backgroundColor: "transparent",
  },
});
