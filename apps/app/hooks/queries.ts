import * as schema from "@/core/schema";
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

export const useFeed = () => {
  const db = useSQLiteContext();
  console.log("DB PATH", db.databasePath); // For Debugging Database
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

  return {
    createFeed,
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

  return {
    readMediaSources,
  };
};

const getWhereClauseFromParams = (
  params: Record<string, string | number | (string | number)[]> | undefined
): Partial<schema.TMediaItem> | undefined => {
  if (!params) {
    return undefined;
  }
  const conditions = Object.entries(params).map(([key, value]) => {
    const parsedValue =
      value === "true" || value === "false" ? value === "true" : value;

    return [key, parsedValue];
  });

  if (conditions.length === 0) {
    return undefined;
  }

  return Object.fromEntries(conditions);
};

export const useMediaItem = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const readMediaItems = (
    filters?: Record<string, string | number | (string | number)[]>
  ) => {
    const parsedFilters = getWhereClauseFromParams(filters);
    const conditions = parsedFilters
      ? Object.entries(parsedFilters).flatMap(([field, value]) => {
          if (!value || !(field in schema.mediaItem)) return [];
          return [
            eq(
              schema.mediaItem[field as keyof schema.TMediaItem],
              value
            ) as SQL<schema.TMediaItem>,
          ];
        })
      : [];
    const hasConditions = conditions && conditions.length > 0;
    console.log({ filters, parsedFilters });

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
      .where(eq(schema.mediaItem.id, id));

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
