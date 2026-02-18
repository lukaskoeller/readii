import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function FeedStackLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const colorText = useThemeColor({}, "text");

  return (
    <Stack>
        <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          headerBlurEffect: "none",
          headerShown: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          contentStyle: {
            backgroundColor,
          },
        }}
      >
        {/* <Stack.Header
          transparent={true}
          blurEffect="none"
          style={{ backgroundColor: backgroundColor }}
        ></Stack.Header> @todo doesn't work yet */}
      </Stack.Screen>
      <Stack.Screen
        name="settings"
        options={{
          presentation: "modal",
          contentStyle: {
            backgroundColor,
          },
        }}
      >
        <Stack.Header style={{ backgroundColor }} />
        <Stack.Screen.Title style={{ color: colorText }}>
          Settings
        </Stack.Screen.Title>
      </Stack.Screen>
    </Stack>
  );
}
