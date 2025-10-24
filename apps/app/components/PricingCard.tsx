import { FC } from "react";
import { Card } from "./Card";
import { ThemedText } from "./ThemedText";
import { VStack } from "./VStack";
import { FontWeight, Spacing } from "@/constants/Sizes";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { BOLD_STYLE } from "@/constants/Styles";
import { Button } from "./Button/Button";

export type PricingCardProps = {
  title: string;
  features: string[];
  featuresComingSoon?: string[];
  pricingMonthly: string;
  pricingAnnually?: string;
  isActive: boolean;
};

export const PricingCard: FC<PricingCardProps> = ({
  title,
  features,
  pricingMonthly,
  pricingAnnually,
  featuresComingSoon,
  isActive,
}) => {
  const colorPrimary = useThemeColor({}, "primary");
  const colorText3 = useThemeColor({}, "text3");

  return (
    <Card style={{ paddingBlockStart: 0 }}>
      <ThemedText type="h4" style={{ marginBlockEnd: Spacing.size3 }}>
        {title}
      </ThemedText>
      <VStack gap={Spacing.size2}>
        {features.map((feature) => (
          <ThemedView key={feature} style={styles.listItem}>
            <IconSymbol
              name="checkmark.circle"
              size={Spacing.size4}
              color={colorText3}
            />
            <ThemedText type="small" style={{ color: colorText3 }}>
              {feature}
            </ThemedText>
          </ThemedView>
        ))}
      </VStack>
      {featuresComingSoon && (
        <>
          <ThemedText type="h6" style={{ marginBlockStart: Spacing.size5 }}>
            Coming Soon
          </ThemedText>
          <VStack gap={Spacing.size2}>
            {features.map((feature) => (
              <ThemedView key={feature} style={styles.listItem}>
                <IconSymbol
                  name="checkmark.circle"
                  size={Spacing.size4}
                  color={colorText3}
                />
                <ThemedText type="small" style={{ color: colorText3 }}>
                  {feature}
                </ThemedText>
              </ThemedView>
            ))}
          </VStack>
        </>
      )}

      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          marginInlineStart: "auto",
        }}
      >
        <ThemedText noMargin type="h4" style={BOLD_STYLE}>
          {pricingMonthly}
        </ThemedText>
        <ThemedText noMargin type="small">
          /month
        </ThemedText>
      </ThemedView>
      {pricingAnnually && (
        <ThemedView style={{ marginInlineStart: "auto" }}>
          <ThemedText
            type="small"
            style={{ color: colorText3, fontWeight: FontWeight.normal }}
          >
            {pricingAnnually}/month billed annually
          </ThemedText>
        </ThemedView>
      )}
      {isActive ? (
        <ThemedView
          style={{
            marginInlineStart: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing.size1,
            marginBlockStart: Spacing.size1,
          }}
        >
          <IconSymbol
            name="checkmark"
            size={Spacing.size4}
            color={colorPrimary}
          />
          <ThemedText style={{ color: colorPrimary }}>Subscribed</ThemedText>
        </ThemedView>
      ) : (
        <Button
          onPress={() => {
            console.log("Upgrade");
          }}
          style={{ marginInlineStart: "auto", marginBlockStart: Spacing.size4 }}
          size="small"
        >
          Upgrade
        </Button>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.size3,
  },
});
