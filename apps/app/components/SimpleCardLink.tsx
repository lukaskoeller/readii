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
      <ThemedView style={styles.link}>
        <ThemedText type="h6" style={styles.label}>
          {props.label}
        </ThemedText>
      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingBlock: Spacing.size2,
    paddingBlockStart: Spacing.size5,
    paddingInline: Spacing.size3,
    borderRadius: Radius.size4,
    minHeight: Spacing.size11,
  },
  link: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  label: {
    marginBlockEnd: 0,
  },
});
