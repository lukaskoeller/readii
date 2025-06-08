import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontSize, FontWeight, Radius, Spacing } from "@/constants/Sizes";
import { useItem } from "@/hooks/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function TabTwoScreen() {
  const { readItems } = useItem();
  const { data } = useLiveQuery(readItems());
  const router = useRouter();
  const colorBackground2 = useThemeColor({}, "background2");
  const colorText2 = useThemeColor({}, "text2");

  return (
    <FlatList
      style={styles.list}
      data={data}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.navigate(`/feed/${item.id}`)}>
          <ThemedView style={styles.item}>
            <ThemedView>
              {item.media_thumbnail ? (
                <Image
                  style={styles.thumbnail}
                  source={item.media_thumbnail}
                  placeholder={{ blurhash  }}
                  contentFit="cover"
                  transition={500}
                />
              ) : (
                <ThemedView
                  style={{
                    ...styles.thumbnail,
                    backgroundColor: colorBackground2,
                  }}
                ></ThemedView>
              )}
            </ThemedView>
            <View style={styles.desc}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedView style={styles.publisher}>
                {item.channel.image?.url && (
                  <Image
                    style={styles.publisherThumbnail}
                    source={item.channel.image?.url}
                    contentFit="cover"
                    transition={1000}
                  />
                )}
                <Text style={{ ...styles.publisherName, color: colorText2 }}>
                  {item.channel.title}
                </Text>
              </ThemedView>
              <ThemedText style={{ ...styles.text, color: colorText2 }}>
                {item.pub_date}
              </ThemedText>
            </View>
          </ThemedView>
        </Pressable>
      )}
      keyExtractor={(item) => String(item.id)}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.size3,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    gap: Spacing.size3,
    paddingBlock: Spacing.size3,
  },
  desc: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontWeight: FontWeight.bold,
    fontSize: FontSize.size3,
    marginBlockEnd: Spacing.size2,
  },
  text: {
    fontSize: FontSize.size3,
    marginBlockStart: Spacing.size2,
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
  },
  meta: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.size3,
    marginBlockEnd: Spacing.size2,
  },
  publisher: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size1,
  },
  publisherThumbnail: {
    width: Spacing.size4,
    height: Spacing.size4,
    borderRadius: Radius.size3,
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
