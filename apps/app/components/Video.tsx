import { FC, useState } from "react";
import { ThemedView } from "./ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useVideoPlayer, VideoPlayerStatus, VideoView } from "expo-video";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import WebView from "react-native-webview";

export type VideoProps = {
  source: string;
  poster: string | undefined;
  style?: StyleProp<ViewStyle>;
};

export const Video: FC<VideoProps> = ({ source, poster, style }) => {
  const colorBackground2 = useThemeColor({}, "background2");

  const [status, setStatus] = useState<VideoPlayerStatus | null>(null);
  const player = useVideoPlayer(source, (player) => {
    player.addListener("statusChange", ({ status }) => {
      setStatus(status);
    });
  });

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor: colorBackground2,
        },
      ]}
    >
      {status === "readyToPlay" && (
        <VideoView
          style={[styles.video, style]}
          player={player}
          fullscreenOptions={{
            enable: true,
          }}
          allowsPictureInPicture
        />
      )}
      {status === "error" && (
        <WebView
          style={[styles.video, { backgroundColor: colorBackground2 }]}
          source={{
            html: `
              <div style="width: 100%; height: 100%;">
                <video controls src="${source}" poster="${poster}" style="width: 100%; height: 100%;">
                  Your browser does not support the video tag.
                </video>
              </div>
            `,
          }}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBlock: Spacing.size3,
    width: "100%",
    aspectRatio: 16 / 9,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
