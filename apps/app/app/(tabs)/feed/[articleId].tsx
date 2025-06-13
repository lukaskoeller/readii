import { HtmlViewer } from "@/components/HtmlView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useItem } from "@/hooks/queries";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { parse } from "parse5";

export default function Article() {
  const { articleId } = useLocalSearchParams();
  const { readItem } = useItem();
  const { data } = useLiveQuery(readItem(Number(articleId)));
  const contentAst = parse(data?.description || "");

  return (
    <SafeAreaView>
      <ThemedView padding={Spacing.size3} style={styles.flow}>
        <ScrollView style={{ marginBlockEnd: Spacing.size8, marginBlockStart: Spacing.size3 }}>
          <ThemedView>
            <ThemedText type="title">{data?.title}</ThemedText>
          </ThemedView>
          <HtmlViewer ast={contentAst} />
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
