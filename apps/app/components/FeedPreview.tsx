import { FC } from "react";
import { ThemedView } from "./ThemedView";
import { Image } from "expo-image";
import { ThemedText } from "./ThemedText";
import { StyleSheet } from "react-native";
import { Radius, Spacing } from "@/constants/Sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { colors } from "@/constants/Colors";

export type FeedPreviewProps = {
  iconUrl: string | null;
  name: string;
  description: string | null;
};

export const FeedPreview: FC<FeedPreviewProps> = ({
  iconUrl,
  name,
  description,
}) => {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ThemedView style={[styles.preview]}>
      {iconUrl ? (
        <Image contentFit="contain" style={styles.thumbnail} source={iconUrl ?? undefined} />
      ) : (
        <ThemedView style={[styles.thumbnail, { backgroundColor }]} />
      )}
      <ThemedView style={styles.previewText}>
        <ThemedText type="h5" color="text2" noMargin>
          {name}
        </ThemedText>
        <ThemedText type="smallStrong" color="text3" noMargin>
          {description}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: Spacing.size12,
    marginBlockStart: Spacing.size2,
  },
  preview: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.size3,
  },
  thumbnail: {
    alignSelf: "flex-start",
    width: Spacing.size8,
    height: Spacing.size8,
    borderRadius: Radius.size3,
    marginBlock: Spacing.size2,
    marginInlineStart: Spacing.size3,
    backgroundColor: colors[2],
  },
  previewText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: Spacing.size2,
    marginBlock: Spacing.size3,
    marginInlineEnd: Spacing.size3,
  },
});
