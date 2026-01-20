import * as schema from "@/core/schema";
import { $MediaItemBase } from "@readii/schemas/zod";
import { and, count, eq, or } from "drizzle-orm";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { parseFiltersToConditions } from "./queries.utils";

export type TCreateMediaSourceArgs = {
  mediaSourceIcon: schema.TMediaSourceIcon;
  mediaSource: schema.TMediaSource;
  mediaItems: Omit<schema.TMediaItem, "mediaSourceId">[];
};

export type TUpdateMediaSourceArgs = {
  mediaSourceIcon: schema.TMediaSourceIcon;
  mediaSource: schema.TMediaSource;
  mediaItems: Omit<
    schema.TMediaItem,
    "mediaSourceId" | schema.TMediaItemUserControlled
  >[];
};

export const useFeed = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const createFeed = async ({
    mediaSourceIcon: mediaSourceIconArgs,
    mediaSource: mediaSourceArgs,
    mediaItems: mediaItemsArgs,
  }: TCreateMediaSourceArgs) => {
    const mediaSource = await drizzleDb
      .insert(schema.mediaSource)
      .values(mediaSourceArgs);
    const mediaSourceId = mediaSource.lastInsertRowId;

    const itemsInsertList = mediaItemsArgs.map(async (itemArg) => {
      return drizzleDb.insert(schema.mediaItem).values({
        ...itemArg,
        mediaSourceId: mediaSourceId,
      });
    });
    const mediaSourceImageInsert = drizzleDb
      .insert(schema.mediaSourceIcon)
      .values({ ...mediaSourceIconArgs, mediaSourceId: mediaSourceId });

    await Promise.all([...itemsInsertList, mediaSourceImageInsert]);
  };

  const updateFeed = async ({
    mediaSourceIcon: mediaSourceIconArgs,
    mediaSource: mediaSourceArgs,
    mediaItems: mediaItemsArgs,
  }: TUpdateMediaSourceArgs) => {
    try {
      const mediaSource = await drizzleDb
        .update(schema.mediaSource)
        .set(mediaSourceArgs)
        .where(eq(schema.mediaSource.feedUrl, mediaSourceArgs.feedUrl))
        .returning({ id: schema.mediaSource.id });
      const mediaSourceId = mediaSource[0].id;

      const itemsInsertOrUpdateList = mediaItemsArgs.map(async (itemArg) => {
        const newMediaItem = $MediaItemBase.parse(itemArg);

        return drizzleDb
          .insert(schema.mediaItem)
          .values({
            ...newMediaItem,
            mediaSourceId: mediaSourceId,
          })
          .onConflictDoUpdate({
            target: schema.mediaItem.url,
            set: newMediaItem,
          });
      });

      const mediaSourceImageUpdate = drizzleDb
        .update(schema.mediaSourceIcon)
        .set(mediaSourceIconArgs)
        .where(eq(schema.mediaSourceIcon.mediaSourceId, mediaSourceId));

      await Promise.all([...itemsInsertOrUpdateList, mediaSourceImageUpdate]);
    } catch (error) {
      // @todo handle error properly
      console.error("Error updating feed:", error);
    }
  };

  return {
    createFeed,
    updateFeed,
  };
};

// const readMediaSourceQuery = drizzleDb.query.mediaSource.findMany({
//     with: {
//       image: true,
//     }
//   })

export const useMediaSource = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const readMediaSources = () =>
    drizzleDb.query.mediaSource.findMany({
      with: {
        icon: true,
      },
    });

  const deleteMediaSource = (
    mediaSourceId: NonNullable<schema.TMediaSource["id"]>,
  ) => {
    db.withTransactionSync(() => {
      const mediaSource = drizzleDb
        .delete(schema.mediaSource)
        .where(eq(schema.mediaSource.id, mediaSourceId));

      const mediaItem = drizzleDb
        .delete(schema.mediaItem)
        .where(eq(schema.mediaItem.mediaSourceId, mediaSourceId));

      const mediaSourceIcon = drizzleDb
        .delete(schema.mediaSourceIcon)
        .where(eq(schema.mediaSourceIcon.mediaSourceId, mediaSourceId));

      mediaSource.run();
      mediaItem.run();
      mediaSourceIcon.run();
    });
  };

  return {
    deleteMediaSource,
    readMediaSources,
  };
};

export const useMediaItem = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const readMediaItemsFromFolderId = (
    folderId: NonNullable<schema.TFolder["id"]>,
  ) => {
    const mediaSourceIds = drizzleDb.query.mediaSourceToFolders
      .findMany({
        where: (item, { eq }) => eq(item.folderId, folderId),
        columns: { mediaSourceId: true },
      })
      .sync()
      .map(({ mediaSourceId }) => mediaSourceId);

    return drizzleDb.query.mediaItem.findMany({
      with: {
        mediaSource: {
          with: {
            icon: true,
          },
        },
      },
      where: (item, { eq }) =>
        or(...mediaSourceIds.map((id) => eq(item.mediaSourceId, id))),
      orderBy: (item, { desc }) => desc(item.publishedAt),
    });
  };

  const readMediaItems = (
    filters?: Record<string, string | number | (string | number)[]>,
  ) => {
    const { conditions, hasConditions } = parseFiltersToConditions(filters);

    return drizzleDb.query.mediaItem.findMany({
      with: {
        mediaSource: {
          with: {
            icon: true,
          },
        },
      },
      where: hasConditions ? and(...conditions) : undefined,
      orderBy: (item, { desc }) => desc(item.publishedAt),
    });
  };

  const readMediaItem = (id: NonNullable<schema.TMediaItem["id"]>) =>
    drizzleDb.query.mediaItem.findFirst({
      with: {
        mediaSource: {
          with: {
            icon: true,
          },
        },
      },
      where: (item, { eq }) => eq(item.id, id),
    });

  const updateMediaItem = (
    id: NonNullable<schema.TMediaItem["id"]>,
    mediaItem: Partial<schema.TMediaItem>,
  ) =>
    drizzleDb
      .update(schema.mediaItem)
      .set(mediaItem)
      .where(eq(schema.mediaItem.id, id))
      .run();

  const readMediaItemsCount = () =>
    drizzleDb.select({ count: count() }).from(schema.mediaItem);
  const readMediaItemsIsStarredCount = () =>
    drizzleDb
      .select({ count: count() })
      .from(schema.mediaItem)
      .where(eq(schema.mediaItem.isStarred, true));
  const readMediaItemsIsReadLaterCount = () =>
    drizzleDb
      .select({ count: count() })
      .from(schema.mediaItem)
      .where(eq(schema.mediaItem.isReadLater, true));
  const readMediaItemsIsUnreadCount = (
    mediaSourceIds?: NonNullable<schema.TMediaItem["mediaSourceId"]>[],
  ) =>
    drizzleDb
      .select({ count: count() })
      .from(schema.mediaItem)
      .where(
        mediaSourceIds
          ? or(
              ...mediaSourceIds.map((id) =>
                and(
                  eq(schema.mediaItem.mediaSourceId, id),
                  eq(schema.mediaItem.isRead, false),
                ),
              ),
            )
          : eq(schema.mediaItem.isRead, false),
      );

  const api = {
    readMediaItem,
    readMediaItems,
    readMediaItemsCount,
    readMediaItemsFromFolderId,
    readMediaItemsIsReadLaterCount,
    readMediaItemsIsStarredCount,
    readMediaItemsIsUnreadCount,
    updateMediaItem,
  };

  return api;
};

export const useReadMediaItem = () => {
  const { mediaItemId } = useLocalSearchParams();
  const { readMediaItem } = useMediaItem();
  const { data } = useLiveQuery(readMediaItem(Number(mediaItemId)));

  return data;
};

export const useUpdateMediaItem = () => {
  const { mediaItemId } = useLocalSearchParams();
  const { updateMediaItem } = useMediaItem();

  const updateFn = useCallback(
    (mediaItem: Partial<schema.TMediaItem>) => {
      return updateMediaItem(Number(mediaItemId), mediaItem);
    },
    [mediaItemId, updateMediaItem],
  );

  return { updateMediaItem: updateFn };
};

export type TCreateFolderArgs = {
  folderArgs: schema.TFolder;
  mediaSourceArgs: Omit<schema.TMediaSourceToFolders, "folderId">[];
};

export const useFolder = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const createFolder = async ({
    folderArgs,
    mediaSourceArgs,
  }: TCreateFolderArgs) => {
    const folder = await drizzleDb.insert(schema.folder).values(folderArgs);
    const folderId = folder.lastInsertRowId;

    await drizzleDb
      .insert(schema.mediaSourceToFolders)
      .values(mediaSourceArgs.map((item) => ({ ...item, folderId })));
  };

  const readFolders = () => {
    return drizzleDb.query.folder.findMany({
      with: {
        mediaSources: {
          with: {
            mediaSource: {
              with: {
                icon: true,
              },
            },
          },
        },
      },
    });
  };

  const deleteFolder = (folderId: NonNullable<schema.TFolder["id"]>) => {
    db.withTransactionSync(() => {
      const deleteFolder = drizzleDb
        .delete(schema.folder)
        .where(eq(schema.folder.id, folderId));

      const deleteMediaSourcesToFolders = drizzleDb
        .delete(schema.mediaSourceToFolders)
        .where(eq(schema.mediaSourceToFolders.folderId, folderId));

      deleteFolder.run();
      deleteMediaSourcesToFolders.run();
    });
  };

  const api = {
    createFolder,
    readFolders,
    deleteFolder,
  };

  return api;
};
