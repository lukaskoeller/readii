import { parseQueryParams } from "@/core/utils";
import { $MediaItemPartial } from "@readii/schemas/zod";
import * as schema from "@/core/schema";
import { eq, SQL } from "drizzle-orm";

/**
 * Parses filter parameters and converts them into SQL conditions for querying media items.
 *
 * This utility function takes a record of filter parameters, parses and validates them
 * using the `$MediaItemPartial` schema, and then maps valid fields to SQL equality conditions
 * using the Drizzle ORM's `eq` function. Only fields defined in the `mediaItem` schema are considered.
 *
 * @param filters - An object where keys are filter field names and values are filter values (string, number, or arrays of these).
 * @returns An object containing:
 *   - `conditions`: An array of SQL conditions for the valid filters.
 *   - `hasConditions`: A boolean indicating if any valid conditions were generated.
 *
 * @example
 * const { conditions, hasConditions } = parseFiltersToConditions({ title: "Book", year: 2023 });
 */
export const parseFiltersToConditions = (
  filters: Record<string, string | number | (string | number)[]> | undefined,
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
            value,
          ) as SQL<schema.TMediaItem>,
        ];
      })
    : [];
  const hasConditions = conditions && conditions.length > 0;

  return {
    conditions,
    hasConditions,
  };
};
