import * as schema from "@/core/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";

export const useAppDatabase = () => {
  const db = useSQLiteContext();
  return useMemo(() => drizzle(db, { schema }), [db]);
};
