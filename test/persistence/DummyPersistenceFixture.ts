const assert = require('chai').assert;

import { AnyValueMap } from 'pip-services3-commons-nodex';
import { RandomString } from 'pip-services3-commons-nodex';
import { Dummy } from '../Dummy';
import { IDummyPersistence } from './IDummyPersistence';

export class DummyPersistenceFixture {
    private _dummy1: Dummy = { id: null, key: "Key 1", content: "Content 1" };
    private _dummy2: Dummy = { id: null, key: "Key 2", content: "Content 2" };

    private _persistence: IDummyPersistence;

    public constructor(persistence: IDummyPersistence) {
        this._persistence = persistence;
    }

    public async testCrudOperations(): Promise<void> {
        // Create one dummy
        let dummy1 = await this._persistence.create(null, this._dummy1);
        assert.isNotNull(dummy1);
        assert.isNotNull(dummy1.id);
        assert.equal(this._dummy1.key, dummy1.key);
        assert.equal(this._dummy1.content, dummy1.content);

        // Create another dummy
        let dummy2 = await this._persistence.create(null, this._dummy2);
        assert.isNotNull(dummy2);
        assert.isNotNull(dummy2.id);
        assert.equal(this._dummy2.key, dummy2.key);
        assert.equal(this._dummy2.content, dummy2.content);

        let page = await this._persistence.getPageByFilter(null, null, null);
        assert.isNotNull(page);
        assert.lengthOf(page.data, 2);

        // Update the dummy
        dummy1.content = "Updated Content 1";
        let dummy = await this._persistence.update(null, dummy1);
        assert.isNotNull(dummy);
        assert.equal(dummy1.id, dummy.id);
        assert.equal(dummy1.key, dummy.key);
        assert.equal(dummy1.content, dummy.content);

        // Partially update the dummy
        dummy = await this._persistence.updatePartially(
            null, dummy1.id,
            AnyValueMap.fromTuples(
                'content', 'Partially Updated Content 1'
            )
        );
        assert.isNotNull(dummy);
        assert.equal(dummy1.id, dummy.id);
        assert.equal(dummy1.key, dummy.key);
        assert.equal('Partially Updated Content 1', dummy.content);

        // Get the dummy by Id
        dummy = await this._persistence.getOneById(null, dummy1.id);
        assert.isNotNull(dummy);
        assert.equal(dummy1.id, dummy.id);
        assert.equal(dummy1.key, dummy.key);
        assert.equal('Partially Updated Content 1', dummy.content);

        // Delete the dummy
        dummy = await this._persistence.deleteById(null, dummy1.id);
        assert.isNotNull(dummy);
        assert.equal(dummy1.id, dummy.id);
        assert.equal(dummy1.key, dummy.key);
        assert.equal('Partially Updated Content 1', dummy.content);

        // Get the deleted dummy
        dummy = await this._persistence.getOneById(null, dummy1.id);
        assert.isNull(dummy);

        // Count total number of objects
        let count = await this._persistence.getCountByFilter(null, null);
        assert.equal(count, 1);
    }

    public async testPageSortingOperations(): Promise<void> {
        for (let d = 0; d < 20; d++) {
            await this._persistence.create(
                null,
                {
                    "id": RandomString.nextString(16, 16),
                    "content": RandomString.nextString(1, 50),
                    "key": `Key ${d}`
                }
            );
        }

        let sortFunc = (d: Dummy) => { return d.content.length * -1; };
        let page = await this._persistence.getSortedPage(null, sortFunc);

        let prevDp = page.data[0];
        for (let dp = 1; dp < page.data.length; dp++) {
            assert.isAtLeast(prevDp.content.length, page.data[dp].content.length);
            prevDp = page.data[dp];
        }
    }

    public async testListSortingOperations(): Promise<void> {
        // Create random objects
        for (let d = 0; d < 20; d++) {
            await this._persistence.create(
                null,
                {
                    "id": RandomString.nextString(16, 16),
                    "content": RandomString.nextString(1, 50),
                    "key": `Key ${d}`
                }
            );
        }

        let sortFunc = (d: Dummy) => { return d.content.length * -1; };
        let list = await this._persistence.getSortedList(null, sortFunc);

        let prevDp = list[0];
        for (let dp = 1; dp < list.length; dp++) {
            assert.isAtLeast(prevDp.content.length, list[dp].content.length);
            prevDp = list[dp];
        }
    }

    public async testBatchOperations(): Promise<void> {
        // Create one dummy
        let dummy1 = await this._persistence.create(null, this._dummy1);
        assert.isNotNull(dummy1);
        assert.isNotNull(dummy1.id);
        assert.equal(this._dummy1.key, dummy1.key);
        assert.equal(this._dummy1.content, dummy1.content);

        // Create another dummy
        let dummy2 = await this._persistence.create(null, this._dummy2);
        assert.isNotNull(dummy2);
        assert.isNotNull(dummy2.id);
        assert.equal(this._dummy2.key, dummy2.key);
        assert.equal(this._dummy2.content, dummy2.content);

        // Read batch
        let items = await this._persistence.getListByIds(null, [dummy1.id, dummy2.id]);
        assert.isArray(items);
        assert.lengthOf(items, 2);

        // Delete batch
        await this._persistence.deleteByIds(null, [dummy1.id, dummy2.id]);

        // Read empty batch
        items = await this._persistence.getListByIds(null, [dummy1.id, dummy2.id]);
        assert.isArray(items);
        assert.lengthOf(items, 0);
    }

}