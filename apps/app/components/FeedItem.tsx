import { Link } from "expo-router";
import { FC } from "react";
import { TMediaItem, TMediaSource } from "@/core/schema";
import { openBrowserAsync } from "expo-web-browser";
import { FeedItemBody, FeedItemBodyProps } from "./FeedItemBody";
import { Pressable } from "react-native";
import { useMediaItem } from "@/hooks/queries";

export type FeedItemProps = {
  id: NonNullable<TMediaItem["id"]>;
  url: TMediaItem["url"];
  viewMode: TMediaSource["viewMode"];
} & FeedItemBodyProps;

export const FeedItem: FC<FeedItemProps> = ({
  id,
  isRead,
  mediaSourceIconUrl,
  mediaSourceName,
  previewText,
  publishedAt,
  thumbnailUrl,
  title,
  url,
  viewMode,
}) => {
  const { updateMediaItem } = useMediaItem();
  const isViewModeBrowser = viewMode === "browser-view";

  if (isViewModeBrowser) {
    return (
      <Pressable
        onPress={async () => {
          await Promise.all([
            openBrowserAsync(url),
            updateMediaItem(Number(id), { isRead: true }),
          ]);
        }}
      >
        <FeedItemBody
          isRead={isRead}
          mediaSourceIconUrl={mediaSourceIconUrl}
          mediaSourceName={mediaSourceName}
          previewText={previewText}
          publishedAt={publishedAt}
          thumbnailUrl={thumbnailUrl}
          title={title}
        />
      </Pressable>
    );
  }

  return (
    <Link
      href={{
        pathname: "/feed/[mediaItemId]",
        params: { mediaItemId: id, viewMode },
      }}
      onPress={async () => {
        if (isViewModeBrowser) {
          openBrowserAsync(url);
        }
      }}
    >
      <FeedItemBody
        isRead={isRead}
        mediaSourceIconUrl={mediaSourceIconUrl}
        mediaSourceName={mediaSourceName}
        previewText={previewText}
        publishedAt={publishedAt}
        thumbnailUrl={thumbnailUrl}
        title={title}
      />
    </Link>
  );
};
