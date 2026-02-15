import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function FeedSettings() {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ThemedView>
      
      <ThemedText>Feed Settings</ThemedText>
    </ThemedView>
  );
}
