/** @module core */
import { IIdentifiable } from 'pip-services3-commons-nodex';

/**
 * Interface for data processing components that can get data items.
 */
export interface IGetter<T extends IIdentifiable<K>, K> {
    /**
     * Gets a data items by its unique id.
     * 
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param id                an id of item to be retrieved.
     * @returns                a found data item or <code>null</code> otherswise.
     */
    getOneById(correlationId: string, id: K): Promise<T>;
}
