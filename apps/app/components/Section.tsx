import { Link, LinkProps } from "expo-router";
import { FC } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, ViewProps } from "react-native";
import { FontSize, Spacing } from "@/constants/Sizes";

export type SectionProps = {
  title: string;
  children: React.ReactNode;
  href?: LinkProps["href"];
  style?: ViewProps["style"];
  headerPadding?: boolean;
  bodyPadding?: boolean;
};

export const Section: FC<SectionProps> = ({
  title,
  children,
  href,
  style,
  headerPadding,
  bodyPadding,
}) => {
  const colorText2 = useThemeColor({}, "text2");
  const heading = (
    <ThemedText type="h4" noMargin>
      {title}
    </ThemedText>
  );

  return (
    <ThemedView style={style}>
      {href ? (
        <Link href={href}>
          <ThemedView
            style={[
              styles.header,
              headerPadding && {
                paddingInline: Spacing.size4,
              },
            ]}
          >
            {heading}
            <ThemedView>
              <IconSymbol
                name="chevron.forward"
                color={colorText2}
                size={FontSize.size3}
              />
            </ThemedView>
          </ThemedView>
        </Link>
      ) : (
        <ThemedView
          style={[
            headerPadding && {
              paddingInline: Spacing.size4,
            },
          ]}
        >
          {heading}
        </ThemedView>
      )}
      <ThemedView
        style={[
          styles.content,
          bodyPadding && {
            paddingInline: Spacing.size4,
          },
        ]}
      >
        {children}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.size2,
    paddingInlineEnd: Spacing.size3,
  },
  content: {
    marginBlockStart: Spacing.size2,
  },
});
