import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CATEGORIES } from "@/constants/data";

const getTitle = (category: string) => {
  return CATEGORIES.find((c) => c.key === category)?.label ?? category;
};

export default function Category() {
  const backgroundColor = useThemeColor({}, "background");
  const params = useLocalSearchParams<{ category: string }>();

  return (
    <ThemedView style={{ backgroundColor }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor,
          },
          headerTitle: getTitle(params.category),
        }}
      />
      <FlatList
        data={[
          {
            title: "Example Feed",
            url: "https://example.com/feed",
            description: "This is an example feed description.",
          },
          {
            title: "Another Feed",
            url: "https://another.com/feed",
            description: null,
          },
          {
            title: "Third Feed",
            url: "https://third.com/feed",
            description: "This is the third feed description.",
          },
        ]}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <ThemedText>{item.title}</ThemedText>}
        contentContainerStyle={{ paddingBottom: Spacing.navigation }}
      />
    </ThemedView>
  );
}
