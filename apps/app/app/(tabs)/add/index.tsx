import { Platform, ScrollView, StyleSheet } from "react-native";
import { Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Section } from "@/components/Section";
import { LinkList } from "@/components/LinkList";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { SimpleCardLink } from "@/components/SimpleCardLink";
import { StatusBar } from "expo-status-bar";
import { TwoGrid } from "@/components/TwoGrid";
import { CATEGORIES } from "@/constants/data";
import { Stack } from "expo-router";

export default function AddFeed() {
  const colorBackground = useThemeColor({}, "background");
  const colorText2 = useThemeColor({}, "text2");

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: colorBackground,
          paddingBlockEnd: Spacing.navigation,
        },
      ]}
    >
      <Stack.Screen
        options={{
          headerTitle: "Add",
          headerStyle: {
            backgroundColor: colorBackground,
          },
        }}
      />
      <StatusBar style={Platform.OS === "ios" ? "auto" : "auto"} />
      <LinkList
        style={{ margin: Spacing.container }}
        data={[
          {
            href: "/add/feed",
            id: "/add/feed",
            label: "Add RSS Feed",
            icon: (
              <IconSymbol name="link" size={Spacing.size5} color={colorText2} />
            ),
          },
          // {
          //   href: "/add/collection",
          //   id: "/add/collection",
          //   label: "Add Collection",
          //   icon: (
          //     <IconSymbol
          //       name="rectangle.stack"
          //       size={Spacing.size5}
          //       color={colorText2}
          //     />
          //   ),
          // },
          {
            href: "/add/opml",
            id: "/add/opml",
            label: "Add List of RSS Feeds (OPML)",
            icon: (
              <IconSymbol
                name="smallcircle.fill.circle"
                size={Spacing.size5}
                color={colorText2}
              />
            ),
          },
          {
            href: "/add/newsletter",
            id: "/add/newsletter",
            label: "Add from Newsletter",
            icon: (
              <IconSymbol
                name="envelope"
                size={Spacing.size5}
                color={colorText2}
              />
            ),
          },
          // {
          //   href: "/add/google-alerts",
          //   id: "/add/google-alerts",
          //   label: "Add from Google Alerts",
          //   icon: (
          //     <IconSymbol
          //       name="envelope"
          //       size={Spacing.size5}
          //       color={colorText2}
          //     />
          //   ),
          // },
        ]}
      />
      <Section
        title="Browse Categories"
        // href="/add/categories"
        headerPadding
        bodyPadding
      >
        <TwoGrid
          keyExtractor={(item) => item.key}
          data={[...CATEGORIES]}
          renderItem={(item) => (
            <SimpleCardLink href={item.href} label={item.label} />
          )}
        />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.size4,
  },
});
