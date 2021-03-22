/** @module core */
/**
 * Interface for data processing components that can create, update and delete data items.
 */
export interface IWriter<T, K> {
    /**
     * Creates a data item.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param item              an item to be created.
     * @return                  the created data item.
     */
    create(correlationId: string, item: T): Promise<T>;
    /**
     * Updates a data item.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param item              an item to be updated.
     * @returns                 the updated data item.
     */
    update(correlationId: string, item: T): Promise<T>;
    /**
     * Deleted a data item by it's unique id.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param id                an id of the item to be deleted
     * @returns                 the deleted data item.
     */
    deleteById(correlationId: string, id: K): Promise<T>;
}
