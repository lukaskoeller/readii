import * as schema from "@/core/schema";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card";
import { RadioField } from "@/components/RadioField";
import { TextInputField } from "@/components/TextInputField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { VStack } from "@/components/VStack";
import { Spacing } from "@/constants/Sizes";
import { useMediaSource } from "@/hooks/queries";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function FeedSettings() {
  const params = useLocalSearchParams<{
    mediaSourceId: string;
    feedTitle: string;
  }>();
  const [viewMode, setViewMode] = useState<string>("feed-view");
  const { updateViewMode } = useMediaSource();
  const mediaSourceId = Number(params.mediaSourceId);
  const feedTitle = params.feedTitle;

  return (
    <ThemedView>
      <VStack gap={Spacing.size3}>
        <Card>
          <TextInputField
            label="Feed Title"
            inputProps={{
              value: feedTitle,
            }}
            labelProps={{
              type: "h5",
              noMargin: true,
              style: { paddingBlockEnd: Spacing.size1 },
            }}
          />
        </Card>
        <Card>
          <RadioField
            value={viewMode}
            onChange={(value) => {
              setViewMode(value);
              updateViewMode(
                mediaSourceId,
                value as schema.TMediaSource["viewMode"],
              );
            }}
            labelProps={{
              type: "h5",
            }}
            options={[
              {
                label: "Feed View",
                description: "Shows the feed as provided",
                value: "feed-view",
              },
              {
                label: "Reader View",
                description: "Shows linked article in reader mode",
                value: "reader-view",
              },
              {
                label: "Browser View",
                description: "Opens article in an in-app browser",
                value: "browser-view",
              },
            ]}
          />
        </Card>
        <Card
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: Spacing.size3,
          }}
        >
          <ThemedText>Delete Feed</ThemedText>
          <Button variant="outline" size="small" startIcon={"trash"}>
            Delete
          </Button>
        </Card>
      </VStack>
    </ThemedView>
  );
}
