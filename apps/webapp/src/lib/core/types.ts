/**
 * Utility types for mutations
 */
export type TQueryArgs<T extends Record<string, unknown>> = Omit<T, "id">;

/**
 * Utility type to exclude the `id` field from a type.
 */
export type TExId<T> = Omit<T, "id">