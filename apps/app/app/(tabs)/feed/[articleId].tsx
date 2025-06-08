import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useItem } from "@/hooks/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";

export default function Article() {
  const { width } = useWindowDimensions();
  const colorText = useThemeColor({}, "text");
  const { articleId } = useLocalSearchParams();
  const { readItem } = useItem();
  const { data } = useLiveQuery(readItem(Number(articleId)));

  return (
    <SafeAreaView>
      <ThemedView padding={Spacing.size3} style={styles.flow}>
        <ScrollView>
          <ThemedView>
            <ThemedText type="title">{data?.title}</ThemedText>
          </ThemedView>
          <RenderHtml
            contentWidth={width - Spacing.size3 * 2}
            source={{ html: `<html><body>${data?.description}</body></html>` }}
            baseStyle={{ color: colorText }}
          />
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
