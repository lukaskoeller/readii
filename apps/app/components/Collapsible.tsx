import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { FontSize, FontWeight, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const colorText2 = useThemeColor({}, "text2");

  return (
    <ThemedView>
      <TouchableOpacity
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <ThemedView style={styles.header}>
          <ThemedText
            type="default"
            style={{ fontWeight: FontWeight.bold }}
            noMargin
          >
            {title}
          </ThemedText>
          <ThemedView style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}>
            <IconSymbol
              name="chevron.forward"
              color={colorText2}
              size={FontSize.size3}
            />
          </ThemedView>
        </ThemedView>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

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
