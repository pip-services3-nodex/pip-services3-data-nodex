/** @module core */
/**
 * Interface for data processing components that can set (create or update) data items.
 */
export interface ISetter<T> {
    /**
     * Sets a data item. If the data item exists it updates it,
     * otherwise it create a new data item.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param item              a item to be set.
     * @returns                 the processed data item.
     */
    set(correlationId: string, item: T): Promise<T>;
}
