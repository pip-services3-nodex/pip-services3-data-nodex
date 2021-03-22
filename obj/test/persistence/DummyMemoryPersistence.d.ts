import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from '../../src/persistence/IdentifiableMemoryPersistence';
import { Dummy } from '../Dummy';
import { IDummyPersistence } from './IDummyPersistence';
export declare class DummyMemoryPersistence extends IdentifiableMemoryPersistence<Dummy, string> implements IDummyPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<Dummy>>;
    getCountByFilter(correlationId: string, filter: FilterParams): Promise<number>;
    getSortedPage(correlationId: string, sort: any): Promise<DataPage<Dummy>>;
    getSortedList(correlationId: string, sort: any): Promise<Dummy[]>;
}
