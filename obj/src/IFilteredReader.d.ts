/** @module core */
import { FilterParams } from 'pip-services3-commons-nodex';
import { SortParams } from 'pip-services3-commons-nodex';
/**
 * Interface for data processing components that can retrieve a list of data items by filter.
 */
export interface IFilteredReader<T> {
    /**
     * Gets a list of data items using filter parameters.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param filter             (optional) filter parameters
     * @param sort              (optional) sort parameters
     * @returns                a list with found data items.
     */
    getListByFilter(correlationId: string, filter: FilterParams, sort: SortParams): Promise<T[]>;
}
