import { StyleSheet, View, Platform, TextInput, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import { FontSize, Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useFeed } from "@/hooks/queries";
import { getFeedData } from "@readii/parser";
import { $HttpsUrl } from "@readii/schemas/zod";
import { Image } from "expo-image";
import * as Clipboard from "expo-clipboard";

export type TFeedPreview = {
  iconUrl: string | null;
  name: string;
  url: string;
  description: string | null;
  mediaItemsCount: number;
};

export default function AddFeed() {
  const [feedUrl, setFeedUrl] = useState<string>("");
  const [feedPreview, setFeedPreview] = useState<TFeedPreview | null>(null);
  const { createFeed } = useFeed();
  const router = useRouter();
  const colorBackground2 = useThemeColor({}, "background2");
  const colorBorder = useThemeColor({}, "border");
  const colorPrimary = useThemeColor({}, "primary");

  return (
    <View style={[styles.container, { borderColor: colorBorder }]}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <ThemedView style={[styles.preview, { borderColor: colorBorder }]}>
        {feedPreview ? (
          <>
            <Image
              style={styles.thumbnail}
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
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ThemedText
              type="small"
              color="text3"
              noMargin
              style={{ textAlign: "center" }}
            >
              No feed preview available.
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
      <ThemedView>
        <ThemedText>URL</ThemedText>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colorBackground2, borderColor: colorBorder },
          ]}
          inputMode="url"
          onChangeText={async (text) => {
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
              console.log(feedData);
            } else {
              setFeedPreview(null);
            }
          }}
          value={feedUrl}
        />
      </ThemedView>
      <ThemedView>
        <Button
          onPress={async () => {
            const text = await Clipboard.getStringAsync();
            setFeedUrl(text);
          }}
          title="Paste from Clipboard"
        />
      </ThemedView>
      <ThemedView style={{ marginBlockStart: Spacing.size4 }}>
        <Button
          title="Add Feed"
          onPress={async () => {
            try {
              console.log("GET FEED DATA", feedUrl);
              const args = await getFeedData(feedUrl);
              console.log(args);

              await createFeed(args);
              router.navigate("../");
            } catch (error) {
              console.log(error);
            }
          }}
          color={colorPrimary}
        />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.size4,
  },
  input: {
    borderRadius: Radius.size3,
    paddingInline: Spacing.size3,
    paddingBlock: Spacing.size4,
    fontSize: FontSize.size3,
    width: "100%",
    borderWidth: 1,
  },
  preview: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size3,
    minHeight: Spacing.size12,
    padding: Spacing.size3,
    borderRadius: Radius.size3,
    marginBlockStart: Spacing.size2,
    borderWidth: 1,
  },
  thumbnail: {
    alignSelf: "flex-start",
    width: Spacing.size8,
    height: Spacing.size8,
    borderRadius: Radius.size3,
    margin: Spacing.size3,
    marginInlineEnd: 0,
  },
  previewText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: Spacing.size2,
    marginBlock: Spacing.size3,
    marginInlineEnd: Spacing.size3,
  },
});
