import * as schema from "@/core/schema";
import { parseQueryParams } from "@/core/utils";
import { $MediaItemBase, $MediaItemPartial } from "@readii/schemas/zod";
import { and, count, eq, SQL } from "drizzle-orm";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";

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
    mediaSourceId: NonNullable<schema.TMediaSource["id"]>
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
    readMediaSources,
    deleteMediaSource,
  };
};

export const useMediaItem = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const readMediaItems = (
    filters?: Record<string, string | number | (string | number)[]>
  ) => {
    const parsedFilters = parseQueryParams(filters);
    const result = $MediaItemPartial.safeParse(parsedFilters);
    const params = result.success ? result.data : null;

    const conditions = params
      ? Object.entries(params).flatMap(([field, value]) => {
          if (
            value === undefined ||
            value === null ||
            !(field in schema.mediaItem)
          )
            return [];
          return [
            eq(
              schema.mediaItem[field as keyof schema.TMediaItem],
              value
            ) as SQL<schema.TMediaItem>,
          ];
        })
      : [];
    const hasConditions = conditions && conditions.length > 0;

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
    mediaItem: Partial<schema.TMediaItem>
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
  const readMediaItemsIsUnreadCount = () =>
    drizzleDb
      .select({ count: count() })
      .from(schema.mediaItem)
      .where(eq(schema.mediaItem.isRead, false));

  const api = {
    readMediaItems,
    readMediaItem,
    updateMediaItem,
    readMediaItemsCount,
    readMediaItemsIsStarredCount,
    readMediaItemsIsReadLaterCount,
    readMediaItemsIsUnreadCount,
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
    [mediaItemId, updateMediaItem]
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
              }
            },
          }
        },
      },
    });
  };

  const api = {
    createFolder,
    readFolders,
  };

  return api;
};
