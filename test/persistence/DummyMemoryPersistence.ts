import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { IdentifiableMemoryPersistence } from '../../src/persistence/IdentifiableMemoryPersistence';
import { Dummy } from '../Dummy';
import { IDummyPersistence } from './IDummyPersistence';

export class DummyMemoryPersistence
    extends IdentifiableMemoryPersistence<Dummy, string>
    implements IDummyPersistence {


    public constructor() {
        super();
    }

    private composeFilter(filter: FilterParams): (item: Dummy) => boolean {
        filter = filter != null ? filter : new FilterParams();
        let key = filter.getAsNullableString("key");

        return (item) => {
            if (key != null && item.key != key)
                return false;
            return true;
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<Dummy>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async getCountByFilter(correlationId: string, filter: FilterParams): Promise<number> {
        return await super.getCountByFilter(correlationId, this.composeFilter(filter));
    }

    public async getSortedPage(correlationId: string, sort: any): Promise<DataPage<Dummy>> {
        return await super.getPageByFilter(correlationId, null, null, sort, null);
    }

    public async getSortedList(correlationId: string, sort: any): Promise<Dummy[]> {
        return await super.getListByFilter(correlationId, null, sort, null);
    }
}