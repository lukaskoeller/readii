import { SQLiteRunResult } from "expo-sqlite";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "../ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Spacing } from "@/constants/Sizes";
import { Pressable } from "react-native";

export type HeaderActionsProps = {
  isReadLater: boolean;
  isStarred: boolean;
  updateMediaItem: (data: {
    isReadLater?: boolean;
    isStarred?: boolean;
  }) => Promise<SQLiteRunResult>;
};

export function HeaderActions({
  isReadLater,
  isStarred,
  updateMediaItem,
}: HeaderActionsProps) {
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
        onPress={async () => updateMediaItem({ isReadLater: !isReadLater })}
      >
        <IconSymbol
          name={isReadLater ? "clock.badge.fill" : "clock.badge"}
          color={primaryColor}
        />
      </Pressable>
      <Pressable
        style={{
          paddingBlock: Spacing.size1,
          paddingInline: Spacing.size3,
        }}
        onPress={async () => updateMediaItem({ isStarred: !isStarred })}
      >
        <IconSymbol
          name={isStarred ? "star.fill" : "star"}
          color={primaryColor}
        />
      </Pressable>
    </ThemedView>
  );
}
