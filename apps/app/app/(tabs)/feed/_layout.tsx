import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function FeedStackLayout() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Feed",
          headerStyle: {
            backgroundColor,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="[mediaItemId]"
        options={{
          headerStyle: {
            backgroundColor,
          },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
