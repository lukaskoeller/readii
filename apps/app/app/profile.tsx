import { Card } from "@/components/Card";
import { LinkList } from "@/components/LinkList";
import { PricingCard } from "@/components/PricingCard";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { VStack } from "@/components/VStack";
import { Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";

export default function Profile() {
  const backgroundColor = useThemeColor({}, "background");
  const colorText = useThemeColor({}, "text");

  return (
    <ScrollView
      style={{
        padding: Spacing.container,
        backgroundColor: backgroundColor,
      }}
    >
      <Stack.Screen
        options={{
          contentStyle: {
            backgroundColor,
          },
        }}
      >
        <Stack.Header style={{ backgroundColor }} />
        <Stack.Screen.BackButton displayMode="minimal" />
        <Stack.Screen.Title style={{ color: colorText }}>
          Profile
        </Stack.Screen.Title>
      </Stack.Screen>
      <VStack style={{ marginBlockEnd: Spacing.navigation * 2 }}>
        <Section title="Subscriptions">
          <VStack gap={Spacing.size3}>
            <PricingCard
              title="Free Plan"
              features={["Up to 10 feeds", "Folders"]}
              pricingMonthly="0€"
              isActive={true}
            />
            <PricingCard
              title="Basic Plan"
              features={[
                "Everything from Free Plan",
                "Up to 150 feeds",
                "Newsletter",
              ]}
              pricingMonthly="1€"
              pricingAnnually="0,85€"
              isActive={false}
            />
            <PricingCard
              title="Pro Plan"
              pricingMonthly="8€"
              pricingAnnually="6€"
              features={["Everything from Basic Plan", "Up to 2500 feeds"]}
              isActive={false}
            />
          </VStack>
        </Section>
        <Section title="About">
          <Card style={{ paddingBlockStart: 0 }}>
            <LinkList
              data={[
                {
                  id: "website",
                  href: "https://readii.de",
                  label: "Website",
                  icon: <IconSymbol name="globe" />,
                },
                {
                  id: "bluesky",
                  href: "https://bsky.app/profile/readii.bsky.social",
                  label: "readii on Bluesky",
                  icon: <IconSymbol name="person.bubble" />,
                },
                {
                  id: "feedback",
                  href: "https://wa.me/message/6D6KQFSIQQ6EG1",
                  label: "Send feedback via WhatsApp",
                  icon: <IconSymbol name="message" />,
                },
              ]}
            ></LinkList>
            <ThemedView style={{ marginBlockStart: Spacing.size6 }}>
              <ThemedText>
                Moin! This app is built by{" "}
                <TextLink href="https://bsky.app/profile/lukaskllr.bsky.social">
                  lukas koeller
                </TextLink>{" "}
                & <TextLink href={"https://nordcode.agency"}>nordcode</TextLink>{" "}
                based in Hamburg. If you ever come by, try a Franzbrötchen. And
                say &quot;Moin!&quot; to everybody. Tschüss.
              </ThemedText>
            </ThemedView>
          </Card>
        </Section>
      </VStack>
    </ScrollView>
  );
}
