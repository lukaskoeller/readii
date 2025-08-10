import {
  StyleSheet,
  View,
  Platform,
  TextInput,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
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
import { Collapsible } from "@/components/Collapsible";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { LinkList } from "@/components/LinkList";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { SimpleCardLink } from "@/components/SimpleCardLink";

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
  const colorText2 = useThemeColor({}, "text2");

  return (
    <View style={[styles.container, { borderColor: colorBorder }]}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <LinkList
        style={{ margin: Spacing.container }}
        data={[
          {
            href: "/add/feed",
            label: "Add Feed",
            icon: (
              <IconSymbol name="link" size={Spacing.size5} color={colorText2} />
            ),
          },
          {
            href: "/add/collection",
            label: "Add Collection",
            icon: (
              <IconSymbol
                name="rectangle.stack"
                size={Spacing.size5}
                color={colorText2}
              />
            ),
          },
          {
            href: "/add/opml",
            label: "Add from OPML",
            icon: (
              <IconSymbol
                name="smallcircle.fill.circle"
                size={Spacing.size5}
                color={colorText2}
              />
            ),
          },
        ]}
      />
      <Section title="Browse Categories" href="/add/categories">
        <FlatList
          data={[
            { href: "/add/categories/news-politics", label: "News & Politics" },
            { href: "/add/categories/entertainment", label: "Entertainment" },
            { href: "/add/categories/sports", label: "Sports" },
            {
              href: "/add/categories/money-business",
              label: "Money & Business",
            },
            { href: "/add/categories/style-beauty", label: "Style & Beauty" },
            { href: "/add/categories/food", label: "Food" },
            {
              href: "/add/categories/travel-regional",
              label: "Travel & Regional",
            },
            { href: "/add/categories/health", label: "Health" },
            { href: "/add/categories/home-garden", label: "Home & Garden" },
            { href: "/add/categories/science-tech", label: "Science & Tech" },
            { href: "/add/categories/cars", label: "Cars" },
            { href: "/add/categories/hobbies", label: "Hobbies" },
            { href: "/add/categories/outdoors", label: "Outdoors" },
            {
              href: "/add/categories/kids-parenting",
              label: "Kids & Parenting",
            },
          ]}
          renderItem={({ item }) => (
            <SimpleCardLink href={item.href} label={item.label} />
          )}
          horizontal
        />
      </Section>
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
      <Card>
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
      </Card>
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
    display: "flex",
    flexDirection: "column",
    gap: Spacing.size4,
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
  gallery: {
    display: "flex",
    flexDirection: "row",
    gap: Spacing.size3,
    rowGap: Spacing.size3,
    columnGap: Spacing.size3,
  },
});
