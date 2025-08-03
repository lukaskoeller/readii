import { Link, LinkProps } from "expo-router";
import { FC } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { FontSize, Spacing } from "@/constants/Sizes";

export type SectionProps = {
  title: string;
  children: React.ReactNode;
  href?: LinkProps["href"];
};

export const Section: FC<SectionProps> = ({ title, children, href }) => {
  const colorBorder = useThemeColor({}, "border");
  const heading = (
    <ThemedText type="h3" noMargin>
      {title}
    </ThemedText>
  );

  return (
    <ThemedView>
      {href ? (
        <Link href={href}>
          <ThemedView style={styles.header}>
            {heading}
            <ThemedView>
              <IconSymbol
                name="chevron.forward"
                color={colorBorder}
                size={FontSize.size4}
              />
            </ThemedView>
          </ThemedView>
        </Link>
      ) : (
        heading
      )}
      <ThemedView>{children}</ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.size1,
    paddingInlineEnd: Spacing.size3,
  },
});
