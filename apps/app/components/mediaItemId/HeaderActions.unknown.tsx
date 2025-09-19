import { Button, Host, HStack } from "@expo/ui/swift-ui";
import { FC } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SQLiteRunResult } from "expo-sqlite";
import { IconSymbol } from "../ui/IconSymbol";
import { Spacing } from "@/constants/Sizes";
import { frame } from "@expo/ui/swift-ui/modifiers";

export type HeaderActionsProps = {
  isReadLater: boolean;
  isStarred: boolean;
  updateMediaItem: (data: {
    isReadLater?: boolean;
    isStarred?: boolean;
  }) => Promise<SQLiteRunResult>;
};

export const HeaderActions: FC<HeaderActionsProps> = ({
  isReadLater,
  isStarred,
  updateMediaItem,
}) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Host
      matchContents
      // style={{ display: "flex", flexDirection: "row", gap: 12 }}
    >
      <HStack spacing={Spacing.size2}>
        <Button
          modifiers={[frame({ minWidth: 60, minHeight: 32 })]}
          variant="plain"
          onPress={async () => {
            updateMediaItem({ isStarred: !isStarred });
          }}
        >
          {/* <IconSymbol
          name={isStarred ? "star.fill" : "star"}
          color={primaryColor}
        /> */}
          Star
        </Button>
        <Button
          variant="default"
          onPress={async () => updateMediaItem({ isReadLater: !isReadLater })}
        >
          Edit
          {/* <IconSymbol
          name={isReadLater ? "clock.badge.fill" : "clock.badge"}
          color={primaryColor}
        /> */}
        </Button>
      </HStack>
    </Host>
  );
};
