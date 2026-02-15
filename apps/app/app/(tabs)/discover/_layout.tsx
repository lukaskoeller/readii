import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function HomeStackLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const colorText = useThemeColor({}, "text");

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: {
            backgroundColor,
          },
        }}
      >
        <Stack.Header style={{ backgroundColor }} />
        <Stack.Screen.Title style={{ color: colorText }}>
          Discover
        </Stack.Screen.Title>
      </Stack.Screen>
      <Stack.Screen
        name="[category]"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
