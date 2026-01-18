import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function HomeStackLayout() {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerStyle: {
            backgroundColor,
          },
          headerTitleStyle: {
            color: textColor,
          }
        }}
      />
    </Stack>
  );
}
