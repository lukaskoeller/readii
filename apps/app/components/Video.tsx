import { FC } from "react";
import { ThemedView } from "./ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useEventListener } from "expo";

export type VideoProps = {
  source: string;
  style?: StyleProp<ViewStyle>;
};

export const Video: FC<VideoProps> = ({ source, style }) => {
  console.log("VIDEO SOURCE!!!", source);
  const player = useVideoPlayer(source);

  useEventListener(player, "statusChange", ({ status, error }) => {
    console.log("Player error: ", error);
  });

  return (
    <ThemedView style={styles.container}>
      <VideoView
        style={[styles.video, style]}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBlock: Spacing.size3,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: 350,
    height: 275,
  },
});
