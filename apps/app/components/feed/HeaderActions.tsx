import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "../ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Spacing } from "@/constants/Sizes";
import { Pressable } from "react-native";
import { useMediaSource } from "@/hooks/queries";
import { useRouter } from "expo-router";

export type HeaderActionsProps = {
  feedTitle: string;
};

export function HeaderActions({
  feedTitle,
}: HeaderActionsProps) {
  const router = useRouter();
  const { deleteMediaSource } = useMediaSource();
  const primaryColor = useThemeColor({}, "primary");

  return (
    <ThemedView
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.size00,
      }}
    >
      <Pressable
        style={{
          paddingBlock: Spacing.size1,
          paddingInline: Spacing.size3,
        }}
        aria-label="Delete Feed"
        onPress={async () => {
          deleteMediaSource(feedTitle, "name")
          router.replace("/home");
        }}
      >
        <IconSymbol
          name={"trash"}
          color={primaryColor}
        />
      </Pressable>
    </ThemedView>
  );
}
