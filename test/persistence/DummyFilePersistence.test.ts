import { ConfigParams } from 'pip-services3-commons-nodex';
import { DummyPersistenceFixture } from './DummyPersistenceFixture';
import { DummyFilePersistence } from './DummyFilePersistence';

suite('DummyFilePersistence', ()=> {    
    let persistence: DummyFilePersistence;
    let fixture: DummyPersistenceFixture;
 
    setup(async () => {
        persistence = new DummyFilePersistence();
        persistence.configure(ConfigParams.fromTuples(
            "path", "./data/dummies.json"
        ))

        fixture = new DummyPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });

    test('Crud Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Batch Operations', async () => {
        await fixture.testBatchOperations();
    });

    test('Sort Operations', async () => {
        await fixture.testPageSortingOperations();
    })

    test('List Sort Operations', async () =>{
        await fixture.testListSortingOperations();
    })
});