/** @module core */
import { SortParams } from 'pip-services3-commons-nodex';
/**
 * Interface for data processing components that can query a list of data items.
 */
export interface IQuerableReader<T> {
    /**
     * Gets a list of data items using a query string.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param query            (optional) a query string
     * @param sort             (optional) sort parameters
     * @returns                a list with found data items.
     */
    getListByQuery(correlationId: string, query: string, sort: SortParams): Promise<T[]>;
}
