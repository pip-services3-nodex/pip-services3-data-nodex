/** @module core */
/**
 * Interface for data processing components that save data items.
 */
export interface ISaver<T> {
    /**
     * Saves given data items.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param item              a list of items to save.
     */
    save(correlationId: string, items: T[]): Promise<void>;
}
