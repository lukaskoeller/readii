import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function FeedStackLayout() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerStyle: {
            backgroundColor,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          headerTitle: "Add new Feed",
        }}
      />
    </Stack>
  );
}
