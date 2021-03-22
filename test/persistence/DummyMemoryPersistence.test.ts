import { ConfigParams } from 'pip-services3-commons-nodex';
import { DummyPersistenceFixture } from './DummyPersistenceFixture';
import { DummyMemoryPersistence } from './DummyMemoryPersistence';

suite('DummyMemoryPersistence', ()=> {    
    let persistence: DummyMemoryPersistence;
    let fixture: DummyPersistenceFixture;

    setup(() => {
        persistence = new DummyMemoryPersistence();
        persistence.configure(new ConfigParams());

        fixture = new DummyPersistenceFixture(persistence);
    });

    test('Crud Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Batch Operations', async () => {
        await fixture.testBatchOperations();
    });

    test('Page Sort Operations', async () => {
        await fixture.testPageSortingOperations();
    })

    test('List Sort Operations', async () =>{
        await fixture.testListSortingOperations();
    })

});