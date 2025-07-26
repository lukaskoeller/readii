import { StyleSheet, View, Platform, TextInput, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import { FontSize, Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useFeed } from "@/hooks/queries";
import { getFeedData } from "@readii/parser";

export default function AddFeed() {
  const [feedUrl, setFeedUrl] = useState<string>("");
  const { createFeed } = useFeed();
  const router = useRouter();
  const colorBackground = useThemeColor({}, "background");
  const colorBackground2 = useThemeColor({}, "background2");
  const colorBorder = useThemeColor({}, "border");
  const colorPrimary = useThemeColor({}, "primary");
  return (
    <View style={[styles.container, { backgroundColor: colorBackground }]}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <ThemedView>
        <ThemedText>URL</ThemedText>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colorBackground2, borderColor: colorBorder },
          ]}
          onChangeText={(text) => setFeedUrl(text)}
          value={feedUrl}
        />
      </ThemedView>
      <ThemedText type="small" style={{ marginTop: Spacing.size2 }}>
        {feedUrl}
      </ThemedText>
      <Button
        title="Add Feed"
        onPress={async () => {
          try {
            const args = await getFeedData(feedUrl);
            await createFeed(args);
            router.navigate("../");
          } catch (error) {
            console.log(error);
          }
        }}
        color={colorPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.size4,
  },
  input: {
    borderRadius: Radius.size3,
    paddingInline: Spacing.size3,
    paddingBlock: Spacing.size4,
    fontSize: FontSize.size3,
    width: "100%",
    borderWidth: 1,
  },
});
