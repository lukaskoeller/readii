import { HtmlViewer } from "@/components/HtmlView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useReadMediaItem, useUpdateMediaItem } from "@/hooks/queries";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
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

  const deviceHeight = Dimensions.get("window").height;

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
          onLayout={({ nativeEvent }) => {
            const thresholdMultiplier = 1.3;
            if (nativeEvent.layout.height <= deviceHeight * thresholdMultiplier) {
              updateMediaItem({ isRead: true });
            }
          }}
          onScroll={({ nativeEvent }) => {
            const padding = 620;
            if (
              nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height -
                nativeEvent.layoutMeasurement.height -
                padding
            ) {
              if (!isRead) {
                updateMediaItem({ isRead: true });
              }
            }
          }}
          scrollEventThrottle={400}
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
