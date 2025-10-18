import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import { $HttpsUrl } from "@readii/schemas/zod";
import { getFeedData } from "@readii/parser";
import { useFeed } from "@/hooks/queries";
import { useRouter } from "expo-router";
import { Radius, Spacing } from "@/constants/Sizes";
import * as Clipboard from "expo-clipboard";
import { TextInputField } from "@/components/TextInputField";
import { Button } from "@/components/Button/Button";
import { FeedPreview } from "@/components/FeedPreview";
import { useForm } from "@tanstack/react-form";
import { z } from "zod/mini";

const schema = z.object({
  feedUrl: $HttpsUrl,
});

const PREVIEW_STATUS = {
  INITIAL: "Enter a feed URL to preview its content.",
  LOADING: <ActivityIndicator size="small" />,
  ERROR: "Could not retrieve preview.\nPlease check the URL and try again.",
} as const;

export type TPreviewStatus = keyof typeof PREVIEW_STATUS;

export type TFeedPreview = {
  iconUrl: string | null;
  name: string;
  url: string;
  description: string | null;
  mediaItemsCount: number;
};

export default function AddFeed() {
  const router = useRouter();
  const { createFeed } = useFeed();
  const [feedPreviewStatus, setFeedPreviewStatus] =
    useState<TPreviewStatus>("INITIAL");
  const [feedPreview, setFeedPreview] = useState<TFeedPreview | null>(null);

  const form = useForm({
    defaultValues: {
      feedUrl: "https://",
    },
    validators: {
      onBlur: schema,
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      try {
        const feedUrlResult = $HttpsUrl.safeParse(value.feedUrl);
        if (feedUrlResult.success) {
          const args = await getFeedData(feedUrlResult.data);
          await createFeed(args);
          router.replace({ pathname: "/(tabs)/add" });
        } else {
          throw new Error("Invalid feed URL");
        }
      } catch (error) {
        console.error("Error creating feed:", error);
        Alert.alert("Could not add feed", "Please try again.");
      }
    },
  });

  const handleOnChangeText = async (url: string) => {
    const feedUrl = $HttpsUrl.safeParse(url);
    if (feedUrl.success) {
      try {
        setFeedPreviewStatus("LOADING");
        const feedData = await getFeedData(feedUrl.data);
        setFeedPreview({
          iconUrl: feedData.mediaSourceIcon.url,
          name: feedData.mediaSource.name,
          url: feedData.mediaSource.url,
          description: feedData.mediaSource.description,
          mediaItemsCount: feedData.mediaItems.length,
        });
        setFeedPreviewStatus("INITIAL");
      } catch {
        setFeedPreviewStatus("ERROR");
      }
    } else {
      setFeedPreview(null);
    }
  };

  return (
    <ThemedView container>
      <Card>
        <ThemedView style={[styles.previewContainer]}>
          <ThemedView style={[styles.preview]}>
            {feedPreview ? (
              <FeedPreview
                iconUrl={feedPreview.iconUrl}
                name={feedPreview.name}
                description={feedPreview.description}
              />
            ) : (
              <ThemedView
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ThemedText
                  type="small"
                  color="text3"
                  noMargin
                  style={{ textAlign: "center" }}
                >
                  {PREVIEW_STATUS[feedPreviewStatus]}
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>
        <form.Field name="feedUrl">
          {(field) => (
            <TextInputField
              label="URL"
              inputProps={{
                inputMode: "url",
                onChangeText: (value) => {
                  field.handleChange(value);
                  handleOnChangeText(value);
                },
                value: field.state.value,
                onBlur: () => {},
              }}
              helper={{
                text: field.state.meta.errors[0]?.message,
                status: "error",
              }}
            />
          )}
        </form.Field>
        <ThemedView style={styles.pasteContainer}>
          <Button
            variant="text"
            onPress={async () => {
              const text = await Clipboard.getStringAsync();
              form.setFieldValue("feedUrl", text);
              await handleOnChangeText(text);
            }}
          >
            Paste from Clipboard
          </Button>
        </ThemedView>
      </Card>
      <ThemedView
        style={{ marginBlockStart: Spacing.size4, marginInline: "auto" }}
      >
        <form.Subscribe selector={(state) => [state.isSubmitting]}>
          {([isSubmitting]) => (
            <Button
              loading={isSubmitting}
              onPress={() => {
                form.handleSubmit();
              }}
            >
              Add Feed
            </Button>
          )}
        </form.Subscribe>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: Spacing.size12,
    marginBlockStart: Spacing.size2,
  },
  preview: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.size3,
  },
  thumbnail: {
    alignSelf: "flex-start",
    width: Spacing.size8,
    height: Spacing.size8,
    borderRadius: Radius.size3,
    marginBlock: Spacing.size2,
    marginInlineStart: Spacing.size3,
  },
  previewText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: Spacing.size2,
    marginBlock: Spacing.size3,
    marginInlineEnd: Spacing.size3,
  },
  pasteContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBlockStart: Spacing.size1,
  },
});
