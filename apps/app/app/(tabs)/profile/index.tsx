import { Card } from "@/components/Card";
import { LinkList } from "@/components/LinkList";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function Profile() {
  const colorBackground = useThemeColor({}, "background");
  const colorText2 = useThemeColor({}, "text2");

  return (
    <ScrollView
      style={{
        padding: Spacing.container,
        backgroundColor: colorBackground,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "Profile",
          headerStyle: {
            backgroundColor: colorBackground,
          },
        }}
      />
      <Card>
        <LinkList
          data={[
            {
              id: "about",
              label: "About",
              href: "/profile/about",
              icon: (
                <IconSymbol
                  name="info.square"
                  size={Spacing.size5}
                  color={colorText2}
                />
              ),
            },
          ]}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
