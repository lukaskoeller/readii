import { HtmlViewer } from "@/components/HtmlView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useReadMediaItem, useUpdateMediaItem } from "@/hooks/queries";
import { Pressable, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { parseFragment } from "parse5";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Article() {
  const data = useReadMediaItem();
  const { updateMediaItem } = useUpdateMediaItem();
  const contentAst = parseFragment(data?.content || "");
  console.log(data?.content, contentAst);

  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");

  const isStarred = Boolean(data?.isStarred);
  const isReadLater = Boolean(data?.isReadLater);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerRight: () => (
            <ThemedView style={{ flexDirection: "row", gap: Spacing.size4 }}>
              <Pressable
                onPress={async () =>
                  updateMediaItem({ isReadLater: !isReadLater })
                }
              >
                <IconSymbol
                  name={isReadLater ? "clock.badge.fill" : "clock.badge"}
                  color={primaryColor}
                />
              </Pressable>
              <Pressable
                onPress={async () => updateMediaItem({ isStarred: !isStarred })}
              >
                <IconSymbol
                  name={isStarred ? "star.fill" : "star"}
                  color={primaryColor}
                />
              </Pressable>
            </ThemedView>
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
            <HtmlViewer ast={contentAst} url={data?.mediaSource.url} />
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flow: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.size4,
  },
});
