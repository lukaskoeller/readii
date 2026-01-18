import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function ProfileStackLayout() {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
        headerTitleStyle: {
          color: textColor,
        },
        contentStyle: {
          backgroundColor,
        },
      }}
    ></Stack>
  );
}
