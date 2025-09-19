import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { $HttpsUrl } from "@readii/schemas/zod";
import { getFeedData } from "@readii/parser";
import { Image } from "expo-image";
import { useFeed } from "@/hooks/queries";
import { useRouter } from "expo-router";
import { Radius, Spacing } from "@/constants/Sizes";
import * as Clipboard from "expo-clipboard";
import { TextInputField } from "@/components/TextInputField";
import { Button } from "@/components/Button/Button";

export type TFeedPreview = {
  iconUrl: string | null;
  name: string;
  url: string;
  description: string | null;
  mediaItemsCount: number;
};

export default function FeedScreen() {
  const router = useRouter();
  const { createFeed } = useFeed();
  const [feedUrl, setFeedUrl] = useState<string>("https://");
  const [feedPreview, setFeedPreview] = useState<TFeedPreview | null>(null);

  const colorBackground2 = useThemeColor({}, "background2");

  const handleOnChangeText = async (text: string) => {
    setFeedUrl(text);
    const feedUrl = $HttpsUrl.safeParse(text);
    if (feedUrl.success) {
      const feedData = await getFeedData(feedUrl.data);
      setFeedPreview({
        iconUrl: feedData.mediaSourceIcon.url,
        name: feedData.mediaSource.name,
        url: feedData.mediaSource.url,
        description: feedData.mediaSource.description,
        mediaItemsCount: feedData.mediaItems.length,
      });
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
              <>
                <Image
                  style={[
                    styles.thumbnail,
                    { backgroundColor: colorBackground2 },
                  ]}
                  source={feedPreview?.iconUrl ?? undefined}
                />
                <ThemedView style={styles.previewText}>
                  <ThemedText type="h5" color="text2" noMargin>
                    {feedPreview?.name}
                  </ThemedText>
                  <ThemedText type="small" color="text3" noMargin>
                    {feedPreview?.description}
                  </ThemedText>
                </ThemedView>
              </>
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
                  Enter a feed URL to preview its content.
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>
        <TextInputField
          label="URL"
          inputProps={{
            inputMode: "url",
            onChangeText: handleOnChangeText,
            value: feedUrl,
          }}
        />
        <ThemedView style={styles.pasteContainer}>
          <Button
            variant="text"
            onPress={async () => {
              const text = await Clipboard.getStringAsync();
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
        <Button
          onPress={async () => {
            try {
              console.log("GET FEED DATA", feedUrl);
              const args = await getFeedData(feedUrl);
              console.log(args);

              await createFeed(args);
              router.replace("/home");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Add Feed
        </Button>
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
