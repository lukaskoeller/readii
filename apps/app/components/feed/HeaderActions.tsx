import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "../ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Spacing } from "@/constants/Sizes";
import { Pressable } from "react-native";
import { useFolder, useMediaSource } from "@/hooks/queries";
import { useRouter } from "expo-router";
import * as schema from "@/core/schema";

export type HeaderActionsProps = {
  mediaSourceId?: NonNullable<schema.TMediaSource["id"]>;
  folderId?: NonNullable<schema.TFolder["id"]>;
};

/**
 * @deprecated Replaced by Stack.Header.MenuAction in feed.tsx
 */
export function HeaderActions({
  mediaSourceId,
  folderId,
}: HeaderActionsProps) {
  const router = useRouter();
  const { deleteMediaSource } = useMediaSource();
  const { deleteFolder } = useFolder();
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
        aria-label={mediaSourceId ? "Delete Feed" : "Delete Folder"}
        onPress={async () => {
          if (mediaSourceId) {
            deleteMediaSource(mediaSourceId)
          }
          if (folderId) {
            deleteFolder(folderId)
          }
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
