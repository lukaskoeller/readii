import { FC } from "react";
import { ThemedView } from "../ThemedView";
import { Button } from "../Button/Button";
import { SQLiteRunResult } from "expo-sqlite";
import { Linking } from "react-native/Libraries/Linking/Linking";
import {  Spacing } from "@/constants/Sizes";
import { StyleSheet } from "react-native";

export type ArticleActionsProps = {
  isRead: boolean;
  url: string | undefined;
  updateMediaItem: (data: { isRead: boolean }) => Promise<SQLiteRunResult>;
};

export const ArticleActions: FC<ArticleActionsProps> = ({
  isRead,
  url,
  updateMediaItem,
}) => {
  return (
    <ThemedView style={styles.actions}>
      <Button
        variant="outline"
        size="small"
        startIcon="app.badge"
        onPress={() => updateMediaItem({ isRead: !isRead })}
      >
        {isRead ? "Mark Unread" : "Mark Read"}
      </Button>
      {url && (
        <Button
          variant="text"
          startIcon="arrow.up.forward.app"
          size="small"
          onPress={() => {
            Linking.openURL(url);
          }}
        >
          Open Original
        </Button>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  actions: {
    display: "flex",
    flexDirection: "row",
    gap: Spacing.size3,
    alignItems: "center",
    marginBlock: Spacing.size3,
  },
});
