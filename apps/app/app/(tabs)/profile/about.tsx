import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";

export default function About() {
  const colorBackground = useThemeColor({}, "background");

  return (
    <ScrollView
      style={{
        padding: Spacing.container,
        backgroundColor: colorBackground,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "About",
          headerStyle: {
            backgroundColor: colorBackground,
          },
        }}
      />
      <Card>
        <ThemedText>About this app</ThemedText>
      </Card>
    </ScrollView>
  );
}