import { HtmlViewer } from "@/components/HtmlView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useReadMediaItem, useUpdateMediaItem } from "@/hooks/queries";
import { ScrollView, StyleSheet, Dimensions, Linking } from "react-native";
import { parseFragment } from "parse5";
import { Icon, Label, Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

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
      <Stack.Header style={{ backgroundColor }}>
        <Stack.Header.Title>{""}</Stack.Header.Title>
        <Stack.Header.Right>
          <Stack.Header.Button
            onPress={async () => updateMediaItem({ isReadLater: !isReadLater })}
            icon={isReadLater ? "clock.badge.fill" : "clock.badge"}
          />
          <Stack.Header.Menu icon="ellipsis">
            <Stack.Header.MenuAction
              onPress={async () => updateMediaItem({ isStarred: !isStarred })}
            >
              <Label>{isStarred ? "Unstar" : "Star"}</Label>
              <Icon sf={isStarred ? "star.fill" : "star"} />
            </Stack.Header.MenuAction>
            <Stack.Header.MenuAction
              onPress={() => updateMediaItem({ isRead: !isRead })}
            >
              <Label>{isRead ? "Mark Unread" : "Mark Read"}</Label>
              <Icon sf="app.badge" />
            </Stack.Header.MenuAction>
            <Stack.Header.MenuAction
              onPress={() => {
                if (!url) return;
                Linking.openURL(url);
              }}
            >
              <Label>Open Original</Label>
              <Icon sf="arrow.up.forward.app" />
            </Stack.Header.MenuAction>
          </Stack.Header.Menu>
        </Stack.Header.Right>
      </Stack.Header>
      <ThemedView style={styles.flow}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ padding: Spacing.size4 }}
          contentContainerStyle={{ paddingBlockEnd: Spacing.navigation }}
          onLayout={({ nativeEvent }) => {
            const thresholdMultiplier = 1.3;
            if (
              nativeEvent.layout.height <=
              deviceHeight * thresholdMultiplier
            ) {
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
