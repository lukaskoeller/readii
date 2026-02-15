import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card";
import { TextInputField } from "@/components/TextInputField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { VStack } from "@/components/VStack";
import { FontSize, Radius, Spacing } from "@/constants/Sizes";
import { TEXT_DEFAULT_STYLE } from "@/constants/Styles";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function FeedSettings() {
  const params = useLocalSearchParams<{
    mediaSourceId: string;
    feedTitle: string;
  }>();
  const headerHeight = useHeaderHeight();

  const mediaSourceId = Number(params.mediaSourceId);
  const feedTitle = params.feedTitle;

  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text3");
  const borderColor = useThemeColor({}, "border");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ThemedView style={{ marginBlockStart: headerHeight }}>
      <VStack gap={Spacing.size3}>
        <Card>
          <TextInputField
            label="Feed Title"
            inputProps={{
              value: feedTitle,
            }}
            labelProps={{
              type: "h5",
              noMargin: true,
              style: { paddingBlockEnd: Spacing.size1 },
            }}
          />
        </Card>
        <Card>
          <ThemedText type="h5">View Mode</ThemedText>
          <VStack gap={Spacing.size2}>
            {[
              {
                label: "Feed View",
                description: "Shows the feed as provided",
                checked: true,
              },
              {
                label: "Reader View",
                description:
                  "Shows full article in reader mode",
                checked: false,
              },
              {
                label: "Browser View",
                description: "Opens article in an in-app browser",
                checked: false,
              },
            ].map((option) => (
              <ThemedView style={[styles.radio, { borderColor }]}>
                <ThemedView style={{ flexShrink: 1 }}>
                  <ThemedText color="text">{option.label}</ThemedText>
                  <ThemedText type="small">{option.description}</ThemedText>
                </ThemedView>
                <ThemedView>
                  <IconSymbol
                   size={FontSize.size7}
                    name={
                      option.checked
                        ? "checkmark.circle.fill"
                        : "checkmark.circle"
                    }
                    color={option.checked ? primaryColor : undefined}
                  />
                </ThemedView>
              </ThemedView>
            ))}
          </VStack>
        </Card>
        <Card style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: Spacing.size3 }}>
            <ThemedText>Delete Feed</ThemedText>
            <Button variant="outline" size="small">
                Delete
            </Button>
        </Card>
      </VStack>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    gap: Spacing.size6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: Radius.size5,
    paddingInline: Spacing.size3,
    paddingBlock: Spacing.size4,
    width: "100%",
    borderWidth: 1.5,
  },
  checkbox: {
    width: TEXT_DEFAULT_STYLE.lineHeight * 1.1,
    height: TEXT_DEFAULT_STYLE.lineHeight * 1.1,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
});
