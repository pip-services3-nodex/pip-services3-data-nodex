/** @module core */
import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { SortParams } from 'pip-services3-commons-nodex';

/**
 * Interface for data processing components that can retrieve a page of data items by a filter.
 */
export interface IFilteredPageReader<T> {
    /**
     * Gets a page of data items using filter parameters.
     * 
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param filter            (optional) filter parameters
     * @param paging            (optional) paging parameters
     * @param sort              (optional) sort parameters
     * @returns                 a requested page with found data items.
     */
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, sort: SortParams): Promise<DataPage<T>>;
}
