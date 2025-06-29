import { HtmlViewer } from "@/components/HtmlView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useMediaItem } from "@/hooks/queries";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { parse } from "parse5";

export default function Article() {
  const { articleId } = useLocalSearchParams();
  const { readItem } = useMediaItem();
  const { data } = useLiveQuery(readItem(Number(articleId)));
  const contentAst = parse(data?.content || "");
  console.log(data, contentAst);

  return (
    <SafeAreaView>
      <ThemedView style={styles.flow}>
        <ScrollView style={{ padding: Spacing.size3 }}>
          <ThemedView
            style={{
              marginBlockEnd: Spacing.size8,
            }}
          >
            <ThemedText type="h1">{data?.title}</ThemedText>
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
    gap: Spacing.size3,
  },
});
