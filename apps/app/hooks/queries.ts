import * as schema from "@/core/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

export type TCreateMediaSourceArgs = {
  mediaSourceIcon: schema.TMediaSourceIcon;
  mediaSource: schema.TMediaSource;
  mediaItems: schema.TMediaItem[];
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
    const mediaSource = await drizzleDb.insert(schema.mediaSource).values(mediaSourceArgs);
    const mediaSourceId = mediaSource.lastInsertRowId;

    const itemsInsertList = mediaItemsArgs.map(async (itemArg) => {
        return drizzleDb.insert(schema.mediaItem).values({
          ...itemArg,
          mediaSourceId: mediaSourceId,
        });
      })
    const mediaSourceImageInsert = drizzleDb
      .insert(schema.mediaSourceIcon)
      .values({ ...mediaSourceIconArgs, mediaSourceId: mediaSourceId })

    await Promise.all([
      ...itemsInsertList,
      mediaSourceImageInsert,
    ]);
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

export const useMediaItem = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const readMediaItems = () => drizzleDb.query.mediaItem.findMany({
    with: {
      mediaSource: {
        with: {
          icon: true,
        },
      },
    },
  });

  const readItem = (id: NonNullable<schema.TMediaItem["id"]>) => drizzleDb.query.mediaItem.findFirst({
    with: {
      mediaSource: {
        with: {
          icon: true,
        },
      },
    },
    where: (item, { eq }) => eq(item.id, id),
  });

  return {
    readItems: readMediaItems,
    readItem,
  };
}
