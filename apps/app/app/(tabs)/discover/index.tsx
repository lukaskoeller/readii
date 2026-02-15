import { Section } from "@/components/Section";
import { SimpleCardLink } from "@/components/SimpleCardLink";
import { TwoGrid } from "@/components/TwoGrid";
import { CATEGORIES } from "@/constants/data";
import { Spacing } from "@/constants/Sizes";
import { ScrollView, StyleSheet } from "react-native";

export default function DiscoverScreen() {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingBlockEnd: Spacing.navigation,
        },
      ]}
    >
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
