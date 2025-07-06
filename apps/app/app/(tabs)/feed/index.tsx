import { FlatList, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontSize, FontWeight, Radius, Spacing } from "@/constants/Sizes";
import { useMediaItem } from "@/hooks/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { getPreviewText } from "@/core/utils";
import { parse } from "parse5";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabTwoScreen() {
  const { readMediaItems } = useMediaItem();
  const params = useLocalSearchParams();
  const { data } = useLiveQuery(readMediaItems(params));
  const colorBackground3 = useThemeColor({}, "background3");
  const colorText2 = useThemeColor({}, "text2");

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={{ paddingBottom: Spacing.size12 }}
      data={data}
      renderItem={({ item }) => {
        const contentAst = parse(item?.content || "");
        const previewText = getPreviewText(contentAst);
        return (
          <Link
            href={{
              pathname: "/feed/[mediaItemId]",
              params: { mediaItemId: item.id },
            }}
          >
            <ThemedView style={styles.item}>
              <ThemedView>
                {item.thumbnail ? (
                  <Image
                    style={styles.thumbnail}
                    source={item.thumbnail}
                    contentFit="cover"
                    transition={500}
                  />
                ) : (
                  <ThemedView
                    style={[
                      styles.thumbnail,
                      {
                        backgroundColor: colorBackground3,
                      },
                    ]}
                  >
                    <IconSymbol
                      size={Spacing.size5}
                      name="photo"
                      color={colorText2}
                    />
                  </ThemedView>
                )}
              </ThemedView>
              <View style={styles.desc}>
                <ThemedText color="text" style={styles.title}>
                  {item.title}
                </ThemedText>
                <ThemedView style={styles.publisher}>
                  {item.mediaSource.icon?.url && (
                    <Image
                      style={styles.publisherThumbnail}
                      source={item.mediaSource.icon?.url}
                      contentFit="cover"
                      transition={1000}
                    />
                  )}
                  <Text style={{ ...styles.publisherName, color: colorText2 }}>
                    {item.mediaSource.name}
                  </Text>
                </ThemedView>
                <ThemedText
                  numberOfLines={5}
                  style={{ ...styles.text, color: colorText2 }}
                >
                  {previewText}
                </ThemedText>
              </View>
            </ThemedView>
          </Link>
        );
      }}
      keyExtractor={(item) => String(item.id)}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.size4,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    gap: Spacing.size4,
    paddingBlock: Spacing.size4,
  },
  desc: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontWeight: FontWeight.bold,
    fontSize: FontSize.size3,
    marginBlockEnd: Spacing.size1,
  },
  text: {
    lineHeight: FontSize.size3 * 1.3,
  },
  header: {
    marginBlockStart: Spacing.size4,
    fontSize: FontSize.size1,
    textAlign: "right",
  },
  thumbnail: {
    width: Spacing.size9,
    height: Spacing.size9,
    borderRadius: Radius.size3,
    marginBlockStart: Spacing.size1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  meta: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.size4,
    marginBlockEnd: Spacing.size2,
  },
  publisher: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size1,
    marginBlockEnd: Spacing.size2,
  },
  publisherThumbnail: {
    width: Spacing.size4,
    height: Spacing.size4,
    borderRadius: Radius.size2,
  },
  publisherName: {
    fontWeight: FontWeight.medium,
    fontSize: FontSize.size1,
  },
  publishedAt: {
    fontWeight: FontWeight.medium,
    fontSize: FontSize.size1,
  },
});
