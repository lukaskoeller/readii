import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function HomeStackLayout() {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <Stack screenOptions={{
      headerTitleStyle: {
        color: textColor,
      },
      contentStyle: {
        backgroundColor,
      },
    }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
        }}
      />
    </Stack>
  );
}
