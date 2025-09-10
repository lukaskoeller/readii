import { Platform, StyleSheet, View } from "react-native";
import { Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Section } from "@/components/Section";
import { LinkList } from "@/components/LinkList";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { SimpleCardLink } from "@/components/SimpleCardLink";
import { Gallery } from "@/components/Gallery";
import { StatusBar } from "expo-status-bar";

export default function AddFeed() {
  const colorBorder = useThemeColor({}, "border");
  const colorText2 = useThemeColor({}, "text2");

  return (
    <View style={[styles.container, { borderColor: colorBorder }]}>
      <StatusBar style={Platform.OS === "ios" ? "auto" : "auto"} />
      <LinkList
        style={{ margin: Spacing.container }}
        data={[
          {
            href: "/home/add/feed",
            id: "/home/add/feed",
            label: "Add Feed",
            icon: (
              <IconSymbol name="link" size={Spacing.size5} color={colorText2} />
            ),
          },
          {
            href: "/home/add/collection",
            id: "/home/add/collection",
            label: "Add Collection",
            icon: (
              <IconSymbol
                name="rectangle.stack"
                size={Spacing.size5}
                color={colorText2}
              />
            ),
          },
          {
            href: "/home/add/opml",
            id: "/home/add/opml",
            label: "Add from OPML",
            icon: (
              <IconSymbol
                name="smallcircle.fill.circle"
                size={Spacing.size5}
                color={colorText2}
              />
            ),
          },
        ]}
      />
      <Section
        title="Browse Categories"
        href="/home/add/categories"
        headerPadding
      >
        <Gallery
          data={
            [
              {
                href: "/home/add/categories/news-politics",
                label: "News & Politics",
              },
              {
                href: "/home/add/categories/entertainment",
                label: "Entertainment",
              },
              { href: "/home/add/categories/sports", label: "Sports" },
              {
                href: "/home/add/categories/money-business",
                label: "Money & Business",
              },
              {
                href: "/home/add/categories/style-beauty",
                label: "Style & Beauty",
              },
              { href: "/home/add/categories/food", label: "Food" },
              {
                href: "/home/add/categories/travel-regional",
                label: "Travel & Regional",
              },
              { href: "/home/add/categories/health", label: "Health" },
              {
                href: "/home/add/categories/home-garden",
                label: "Home & Garden",
              },
              {
                href: "/home/add/categories/science-tech",
                label: "Science & Tech",
              },
              { href: "/home/add/categories/cars", label: "Cars" },
              { href: "/home/add/categories/hobbies", label: "Hobbies" },
              { href: "/home/add/categories/outdoors", label: "Outdoors" },
              {
                href: "/home/add/categories/kids-parenting",
                label: "Kids & Parenting",
              },
            ] as const
          }
          renderItem={({ item }) => (
            <SimpleCardLink href={item.href} label={item.label} />
          )}
        />
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.size4,
  },
});
