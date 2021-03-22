/** @module core */
import { AnyValueMap } from 'pip-services3-commons-nodex';

/**
 * Interface for data processing components to update data items partially.
 */
export interface IPartialUpdater<T, K> {
    /**
     * Updates only few selected fields in a data item.
     * 
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param id                an id of data item to be updated.
     * @param data              a map with fields to be updated.
     * @returns                 the updated data item.
     */
    updatePartially(correlationId: string, id: K, data: AnyValueMap): Promise<T>;
}
