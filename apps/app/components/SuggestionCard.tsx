import { FC, useState } from "react";
import { Card } from "./Card";
import { FeedPreview } from "./FeedPreview";
import { ThemedView } from "./ThemedView";
import { Button } from "./Button/Button";
import { TFeedSuggestion } from "@readii/data/suggestions/zod";
import { StyleSheet } from "react-native";
import { useFeed, useMediaSource } from "@/hooks/queries";
import { getFeedData } from "@readii/parser";
import { useRouter } from "expo-router";

export type SuggestionCardProps = {
  item: TFeedSuggestion;
  mediaSourceId: number | undefined;
  isAdded: boolean;
  feedUrl: string;
};

export const SuggestionCard: FC<SuggestionCardProps> = ({
  item,
  isAdded,
  mediaSourceId,
  feedUrl,
}) => {
    const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { createFeed } = useFeed();
  const { deleteMediaSource } = useMediaSource();

  return (
    <Card>
      <FeedPreview
        name={item.title}
        description={item.description}
        iconUrl={item.iconUrl}
      />
      <ThemedView style={styles.actions}>
        <Button
          onPress={async () => {
            setIsLoading(true);
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
            setIsLoading(false);
          }}
          loading={isLoading}
          startIcon={isAdded ? "checkmark" : "plus"}
          variant={isAdded ? "primary" : "text"}
        >
          {isAdded ? "Added" : "Add"}
        </Button>
      </ThemedView>
    </Card>
  );
};

export const styles = StyleSheet.create({
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
