import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { FlatList, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CATEGORIES } from "@/constants/data";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMediaSource } from "@/hooks/queries";
import { TMediaSource } from "@/core/schema";
import { suggestionsByCategory } from "@readii/data";
import { TFeedCategory } from "@readii/data/suggestions/zod";
import { SuggestionCard } from "@/components/SuggestionCard";

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
  const { readMediaSources } = useMediaSource();
  const { data: mediaSources } = useLiveQuery(readMediaSources());
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const params = useLocalSearchParams<{ category: string }>();
  const mediaSourcesRssUrls = mediaSources.map((ms) => ms.feedUrl);

  return (
    <ThemedView style={{ backgroundColor, height: "100%" }}>
      <Stack.Screen>
        <Stack.Header style={{ backgroundColor }} />
        <Stack.Screen.Title style={{ color: textColor }}>{getTitle(params.category)}</Stack.Screen.Title>
      </Stack.Screen>
      <FlatList
        style={{ padding: Spacing.container }}
        data={suggestionsByCategory[params.category as TFeedCategory] ?? []}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={{ height: Spacing.size2 }} />
        )}
        renderItem={({ item }) => {
          const mediaSourceId = getMediaSourceId(mediaSources, item.feedUrl);
          const isAdded = getHasFeedUrl(mediaSourcesRssUrls, item.feedUrl);
          const feedUrl = item.feedUrl;
          return (
            <SuggestionCard
              item={item}
              mediaSourceId={mediaSourceId}
              isAdded={isAdded}
              feedUrl={feedUrl}
            />
          );
        }}
        contentContainerStyle={{ paddingBottom: Spacing.navigation }}
      />
    </ThemedView>
  );
}
