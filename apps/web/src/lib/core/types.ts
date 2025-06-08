/**
 * Utility types for mutations
 */
export type TQueryArgs<T extends Record<string, unknown>> = Omit<T, "id">;