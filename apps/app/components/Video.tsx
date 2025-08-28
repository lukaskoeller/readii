import { FC, useState } from "react";
import { ThemedView } from "./ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useEventListener } from "expo";
import * as FileSystem from "expo-file-system";

export type VideoProps = {
  source: string;
  style?: StyleProp<ViewStyle>;
};

export const Video: FC<VideoProps> = ({ source, style }) => {
  const [uri, setUri] = useState<string | null>(source);
  console.log("VIDEO SOURCE!!!", uri);
  const player = useVideoPlayer(uri);

  useEventListener(player, "statusChange", ({ status, error }) => {
    console.log("Player error: ", error, status);
    if (status === "error") {
      const fileName = source.split("/").at(-1);
      if (!fileName)
        throw new Error(`Could not retrieve file name from source "${source}"`);
      FileSystem.downloadAsync(source, FileSystem.documentDirectory + fileName)
        .then(({ uri }) => {
          console.log("Finished downloading to ", uri);
          setUri(uri);
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
    width: "100%",
    aspectRatio: 16 / 9,
  },
});
