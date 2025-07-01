import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function FeedStackLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");
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
        name="[articleId]"
        options={{
          headerStyle: {
            backgroundColor,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerRight: () => (
            <ThemedView style={styles.actions}>
            <Pressable
              onPress={() => {
                /* your action here */
              }}
            >
              <IconSymbol name="clock.badge" color={primaryColor} />
            </Pressable>
            <Pressable
              onPress={() => {
                /* your action here */
              }}
            >
              <IconSymbol name="star" color={primaryColor} />
            </Pressable>
            </ThemedView>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size4,
  }
});
