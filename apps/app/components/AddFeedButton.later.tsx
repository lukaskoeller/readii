import { router } from "expo-router";
import { FC } from "react";
import { Button, Host } from "@expo/ui/swift-ui";
import { useThemeColor } from "@/hooks/useThemeColor";

export const AddFeedButton: FC = () => {
  const colorPrimary = useThemeColor({}, "primary");
  return (
    <Host matchContents>
      <Button
        variant="glassProminent"
        color={colorPrimary}
        onPress={() => {
          router.navigate("/add");
        }}
      >
        Add Feed
      </Button>
    </Host>
  );
};
