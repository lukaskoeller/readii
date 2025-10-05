import { HtmlViewer } from "@/components/HtmlView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useReadMediaItem, useUpdateMediaItem } from "@/hooks/queries";
import { ScrollView, StyleSheet } from "react-native";
import { parseFragment } from "parse5";
import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { HeaderActions } from "@/components/mediaItemId/HeaderActions";
import { ArticleActions } from "@/components/mediaItemId/ArticleActions";

export default function Article() {
  const data = useReadMediaItem();
  const { updateMediaItem } = useUpdateMediaItem();
  const contentAst = parseFragment(data?.content || "");

  const backgroundColor = useThemeColor({}, "background");

  const isStarred = Boolean(data?.isStarred);
  const isReadLater = Boolean(data?.isReadLater);
  const isRead = Boolean(data?.isRead);
  const url = data?.url;

  return (
    <ThemedView style={{ backgroundColor, minHeight: "100%" }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerRight: () => (
            <HeaderActions
              isReadLater={isReadLater}
              isStarred={isStarred}
              updateMediaItem={updateMediaItem}
            />
          ),
        }}
      />
      <ThemedView style={styles.flow}>
        <ScrollView
          style={{ padding: Spacing.size4 }}
          contentContainerStyle={{ paddingBlockEnd: Spacing.navigation }}
        >
          <ThemedView
            style={{
              marginBlockEnd: Spacing.size8,
            }}
          >
            <ThemedText type="h1" style={{ marginBlockStart: 0 }}>
              {data?.title}
            </ThemedText>
            <ArticleActions
              isRead={isRead}
              url={url}
              updateMediaItem={updateMediaItem}
            />
            <HtmlViewer ast={contentAst} url={data?.mediaSource.url} />
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flow: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.size4,
  },
});
