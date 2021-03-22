/** @module core */
/**
 * Interface for data processing components that load data items.
 */
export interface ILoader<T> {
    /**
     * Loads data items.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @returns a list with loaded data items.
     */
    load(correlationId: string): Promise<T[]>;
}
