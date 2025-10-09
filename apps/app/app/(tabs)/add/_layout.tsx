import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function FeedStackLayout() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor,
          },
        }}
      />
      <Stack.Screen
        name="feed"
        options={{
          title: "Add from URL",
          headerStyle: {
            backgroundColor,
          },
          headerShadowVisible: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="folder"
        options={{
          title: "Add Folder",
          headerStyle: {
            backgroundColor,
          },
          headerShadowVisible: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="[category]"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
