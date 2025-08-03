import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinkListCard } from "@/components/LinkListCard";
import { QuickCardLink } from "@/components/QuickCardLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Spacing } from "@/constants/Sizes";
import { useMediaItem, useMediaSource } from "@/hooks/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Link } from "expo-router";

export default function HomeScreen() {
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

  const colorText2 = useThemeColor({}, "text2");

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ paddingBlockEnd: Spacing.navigation }}
      >
        <ThemedView padding={Spacing.size4}>
          <ThemedText type="h1" style={{ marginBlockStart: 0 }}>
            Hey Luki.
          </ThemedText>
          <ThemedText style={{ marginBlockEnd: Spacing.size5 }}>
            Liebe ist wirklich ein Geschenk Gottes.
          </ThemedText>
        </ThemedView>
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
        <ThemedView padding={Spacing.size4}>
          <ThemedText type="h3">All Feeds</ThemedText>
          <ThemedView>
            <LinkListCard
              data={data.map((item) => ({
                href: {
                  pathname: "/feed",
                  params: { mediaSourceId: item.id, feedTitle: item.name },
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
          </ThemedView>
        </ThemedView>
        <ThemedView padding={Spacing.size4}>
          <Link href={"/add"}>
            <ThemedText>Add Feed</ThemedText>
          </Link>
        </ThemedView>
      </ScrollView>
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
