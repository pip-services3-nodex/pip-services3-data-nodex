import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { AnyValueMap } from 'pip-services3-commons-nodex';

import { IGetter } from '../../src/IGetter';
import { IWriter } from '../../src/IWriter';
import { IPartialUpdater } from '../../src/IPartialUpdater';
import { Dummy } from '../Dummy';

export interface IDummyPersistence extends IGetter<Dummy, String>, IWriter<Dummy, String>, IPartialUpdater<Dummy, String> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<Dummy>>;
    getCountByFilter(correlationId: string, filter: FilterParams): Promise<number>;
    getSortedPage(correlationId: string, sort: any): Promise<DataPage<Dummy>>;
    getSortedList(correlationId: string, sort : any): Promise<Dummy[]>;
    getListByIds(correlationId: string, ids: string[]): Promise<Dummy[]>;
    getOneById(correlationId: string, id: string): Promise<Dummy>;
    create(correlationId: string, item: Dummy): Promise<Dummy>;
    update(correlationId: string, item: Dummy): Promise<Dummy>;
    updatePartially(correlationId: string, id: string, data: AnyValueMap): Promise<Dummy>;
    deleteById(correlationId: string, id: string): Promise<Dummy>;
    deleteByIds(correlationId: string, id: string[]): Promise<void>;
}
