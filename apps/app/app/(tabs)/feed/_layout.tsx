import { Stack } from "expo-router";

export default function FeedStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Feed" }} />
      <Stack.Screen name="[articleId]" options={{ title: "Article" }} />
    </Stack>
  );
}
