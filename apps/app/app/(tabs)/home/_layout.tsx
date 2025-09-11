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
          headerTitle: "Home",
          headerStyle: {
            backgroundColor,
          },
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          headerTitle: "Add new Feed",
          headerStyle: {
            backgroundColor,
          },
        }}
      />
    </Stack>
  );
}
