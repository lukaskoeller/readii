import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Spacing } from "@/constants/Sizes";
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
          <IconSymbol size={28} name="app.badge" color={colorText2} />
          <ThemedText>7</ThemedText>
          <ThemedText>Unread</ThemedText>
        </Card>
        <Card style={styles.card}>
          <IconSymbol size={28} name="star" color={colorText2} />
          <ThemedText>7</ThemedText>
          <ThemedText>Unread</ThemedText>
        </Card>
        <Card style={styles.card}>
          <IconSymbol size={28} name="clock.badge" color={colorText2} />
          <ThemedText>7</ThemedText>
          <ThemedText>Unread</ThemedText>
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
          const channel = feedObj.rss.channel;
          console.log("CHANNEL", channel);

          if (!channel || !Array.isArray(channel.item)) {
            console.error("Invalid feed structure");
            return;
          }
          try {
            const args = {
              channelImage: {
                title: channel.image.title ?? channel.webMaster ?? channel.title,
                link: channel.image.link ?? channel.link,
                url: channel.image.url ?? null,
              },
              channel: {
                title: channel.title,
                link: channel.link,
                description: channel.description,
                atom_link: channel["atom:link"]["@_href"] ?? null,
                copyright: channel.copyright ?? null,
                generator: channel.generator ?? null,
                last_build_date: channel.lastBuildDate ?? null,
                icon: channel.icon ?? null,
                logo: channel.logo ?? null,
                language: channel.language ?? null,
                web_master: channel.webMaster ?? null,
              },
              items: channel.item.map((item: any) => ({
                title: item.title,
                link: item.link,
                description: item.description ?? null,
                guid: item.guid["#text"],
                dc_creator: item["dc:creator"] ?? null,
                pub_date: item.pubDate ?? null,
                enclosure: item.enclosure?.["@_url"] ?? null,
                media_thumbnail: item["media:thumbnail"]?.["@_url"] ?? null,
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
    flexGrow: 1,
    width: "47%", // Adjust width to fit two cards per row incl. gap
  },
});
