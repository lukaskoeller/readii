import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { FlatList, StyleSheet, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CATEGORIES, FEEDS_BY_CATEGORY } from "@/constants/data";
import { FeedPreview } from "@/components/FeedPreview";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button/Button";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useFeed, useMediaSource } from "@/hooks/queries";
import { getFeedData } from "@readii/parser";
import { TMediaSource } from "@/core/schema";

const getTitle = (category: string) => {
  return CATEGORIES.find((c) => c.key === category)?.label ?? category;
};

const getHasFeedUrl = (mediaSourcesRssUrls: string[], feedUrl: string) => {
  return mediaSourcesRssUrls.some((url) => url === feedUrl);
};

const getMediaSourceId = (mediaSources: TMediaSource[], feedUrl: string) => {
  return mediaSources.find((ms) => ms.feedUrl === feedUrl)?.id;
};

export default function Category() {
  const router = useRouter();
  const { createFeed } = useFeed();
  const { deleteMediaSource } = useMediaSource()
  const { readMediaSources } = useMediaSource();
  const { data: mediaSources } = useLiveQuery(readMediaSources());
  const backgroundColor = useThemeColor({}, "background");
  const params = useLocalSearchParams<{ category: string }>();
  const mediaSourcesRssUrls = mediaSources.map((ms) => ms.feedUrl);

  return (
    <ThemedView style={{ backgroundColor, height: "100%" }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor,
          },
          headerTitle: getTitle(params.category),
        }}
      />
      <FlatList
        style={{ padding: Spacing.container }}
        data={
          FEEDS_BY_CATEGORY[
            params.category as keyof typeof FEEDS_BY_CATEGORY
          ] ?? []
        }
        keyExtractor={(item) => item.url}
        ItemSeparatorComponent={() => (
          <View style={{ height: Spacing.size2 }} />
        )}
        renderItem={({ item }) => {
          const mediaSourceId = getMediaSourceId(mediaSources, item.url);
          const isAdded = getHasFeedUrl(mediaSourcesRssUrls, item.url);
          const feedUrl = item.url;
          return (
            <Card>
              <FeedPreview
                name={item.title}
                description={item.description}
                iconUrl={item.imgUrl}
              />
              <ThemedView style={styles.actions}>
                <Button
                  onPress={async () => {
                    if (isAdded && mediaSourceId) {
                      deleteMediaSource(mediaSourceId);
                      return;
                    }

                    try {
                      const args = await getFeedData(feedUrl);
                      await createFeed(args);
                      router.replace("/home");
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  startIcon={isAdded ? "checkmark" : "plus"}
                  variant={isAdded ? "primary" : "text"}
                >
                  {isAdded ? "Added" : "Add"}
                </Button>
              </ThemedView>
            </Card>
          );
        }}
        contentContainerStyle={{ paddingBottom: Spacing.navigation }}
      />
    </ThemedView>
  );
}

export const styles = StyleSheet.create({
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
