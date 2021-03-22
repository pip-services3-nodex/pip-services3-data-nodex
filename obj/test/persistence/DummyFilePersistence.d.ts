import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from '../../src/persistence/JsonFilePersister';
import { DummyMemoryPersistence } from './DummyMemoryPersistence';
import { Dummy } from '../Dummy';
export declare class DummyFilePersistence extends DummyMemoryPersistence {
    protected _persister: JsonFilePersister<Dummy>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
