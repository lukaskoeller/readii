import { Link, LinkProps } from "expo-router";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { StyleSheet } from "react-native";
import { Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";

export type SimpleCardLinkProps = {
  href: LinkProps["href"];
  label: string;
};

export function SimpleCardLink(props: SimpleCardLinkProps) {
  const colorBackground2 = useThemeColor({}, "background2");

  return (
    <Link
      href={props.href}
      style={[styles.card, { backgroundColor: colorBackground2 }]}
    >
      <ThemedView>
        <ThemedText type="h6" style={styles.label}>
          {props.label}
        </ThemedText>
      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingBlock: Spacing.size2,
    paddingInline: Spacing.size3,
    borderRadius: Radius.size4,
    marginInlineEnd: Spacing.size2,
  },
  link: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
  },
  label: {
    marginBlockStart: Spacing.size4,
    marginBlockEnd: 0,
  },
});
