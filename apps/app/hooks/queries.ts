import * as schema from "@/core/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

export type TCreateChannelArgs = {
  channelImage: schema.TChannelImage;
  channel: schema.TChannel;
  items: schema.TItem[];
};

export const useFeed = () => {
  const db = useSQLiteContext();
  console.log(db.databasePath);
  const drizzleDb = drizzle(db, { schema });

  const createFeed = async ({
    channelImage: channelImageArgs,
    channel: channelArgs,
    items: itemsArgs,
  }: TCreateChannelArgs) => {
    const channel = await drizzleDb.insert(schema.channel).values(channelArgs);
    const channelId = channel.lastInsertRowId;

    const itemsInsertList = itemsArgs.map(async (itemArg) => {
        return drizzleDb.insert(schema.item).values({
          ...itemArg,
          channel_id: channelId,
        });
      })
    const channelImageInsert = drizzleDb
      .insert(schema.channelImage)
      .values({ ...channelImageArgs, channel_id: channelId })

    await Promise.all([
      ...itemsInsertList,
      channelImageInsert,
    ]);
    console.log("Finished");
    
  };

  return {
    createFeed,
  };
};

// const readChannelQuery = drizzleDb.query.channel.findMany({
//     with: {
//       image: true,
//     }
//   })

export const useItem = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const readItems = () => drizzleDb.query.item.findMany({
    with: {
      channel: {
        with: {
          image: true,
        },
      },
    },
  });

  const readItem = (id: NonNullable<schema.TItem["id"]>) => drizzleDb.query.item.findFirst({
    with: {
      channel: {
        with: {
          image: true,
        },
      },
    },
    where: (item, { eq }) => eq(item.id, id),
  });

  return {
    readItems,
    readItem,
  };
}
