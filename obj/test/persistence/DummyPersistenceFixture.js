"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyPersistenceFixture = void 0;
const assert = require('chai').assert;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class DummyPersistenceFixture {
    constructor(persistence) {
        this._dummy1 = { id: '', key: "Key 1", content: "Content 1" };
        this._dummy2 = { id: null, key: "Key 2", content: "Content 2" };
        this._persistence = persistence;
    }
    testCrudOperations() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create one dummy
            let dummy1 = yield this._persistence.create(null, this._dummy1);
            assert.isNotNull(dummy1);
            assert.isNotNull(dummy1.id);
            assert.isNotEmpty(dummy1.id);
            assert.equal(this._dummy1.key, dummy1.key);
            assert.equal(this._dummy1.content, dummy1.content);
            // Create another dummy
            let dummy2 = yield this._persistence.create(null, this._dummy2);
            assert.isNotNull(dummy2);
            assert.isNotNull(dummy2.id);
            assert.isNotEmpty(dummy2.id);
            assert.equal(this._dummy2.key, dummy2.key);
            assert.equal(this._dummy2.content, dummy2.content);
            let page = yield this._persistence.getPageByFilter(null, null, null);
            assert.isNotNull(page);
            assert.lengthOf(page.data, 2);
            // Update the dummy
            dummy1.content = "Updated Content 1";
            let dummy = yield this._persistence.update(null, dummy1);
            assert.isNotNull(dummy);
            assert.equal(dummy1.id, dummy.id);
            assert.equal(dummy1.key, dummy.key);
            assert.equal(dummy1.content, dummy.content);
            // Partially update the dummy
            dummy = yield this._persistence.updatePartially(null, dummy1.id, pip_services3_commons_nodex_1.AnyValueMap.fromTuples('content', 'Partially Updated Content 1'));
            assert.isNotNull(dummy);
            assert.equal(dummy1.id, dummy.id);
            assert.equal(dummy1.key, dummy.key);
            assert.equal('Partially Updated Content 1', dummy.content);
            // Get the dummy by Id
            dummy = yield this._persistence.getOneById(null, dummy1.id);
            assert.isNotNull(dummy);
            assert.equal(dummy1.id, dummy.id);
            assert.equal(dummy1.key, dummy.key);
            assert.equal('Partially Updated Content 1', dummy.content);
            // Delete the dummy
            dummy = yield this._persistence.deleteById(null, dummy1.id);
            assert.isNotNull(dummy);
            assert.equal(dummy1.id, dummy.id);
            assert.equal(dummy1.key, dummy.key);
            assert.equal('Partially Updated Content 1', dummy.content);
            // Get the deleted dummy
            dummy = yield this._persistence.getOneById(null, dummy1.id);
            assert.isNull(dummy);
            // Count total number of objects
            let count = yield this._persistence.getCountByFilter(null, null);
            assert.equal(count, 1);
        });
    }
    testPageSortingOperations() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let d = 0; d < 20; d++) {
                yield this._persistence.create(null, {
                    "id": pip_services3_commons_nodex_2.RandomString.nextString(16, 16),
                    "content": pip_services3_commons_nodex_2.RandomString.nextString(1, 50),
                    "key": `Key ${d}`
                });
            }
            let sortFunc = (d) => { return d.content.length * -1; };
            let page = yield this._persistence.getSortedPage(null, sortFunc);
            let prevDp = page.data[0];
            for (let dp = 1; dp < page.data.length; dp++) {
                assert.isAtLeast(prevDp.content.length, page.data[dp].content.length);
                prevDp = page.data[dp];
            }
        });
    }
    testListSortingOperations() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create random objects
            for (let d = 0; d < 20; d++) {
                yield this._persistence.create(null, {
                    "id": pip_services3_commons_nodex_2.RandomString.nextString(16, 16),
                    "content": pip_services3_commons_nodex_2.RandomString.nextString(1, 50),
                    "key": `Key ${d}`
                });
            }
            let sortFunc = (d) => { return d.content.length * -1; };
            let list = yield this._persistence.getSortedList(null, sortFunc);
            let prevDp = list[0];
            for (let dp = 1; dp < list.length; dp++) {
                assert.isAtLeast(prevDp.content.length, list[dp].content.length);
                prevDp = list[dp];
            }
        });
    }
    testBatchOperations() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create one dummy
            let dummy1 = yield this._persistence.create(null, this._dummy1);
            assert.isNotNull(dummy1);
            assert.isNotNull(dummy1.id);
            assert.equal(this._dummy1.key, dummy1.key);
            assert.equal(this._dummy1.content, dummy1.content);
            // Create another dummy
            let dummy2 = yield this._persistence.create(null, this._dummy2);
            assert.isNotNull(dummy2);
            assert.isNotNull(dummy2.id);
            assert.equal(this._dummy2.key, dummy2.key);
            assert.equal(this._dummy2.content, dummy2.content);
            // Read batch
            let items = yield this._persistence.getListByIds(null, [dummy1.id, dummy2.id]);
            assert.isArray(items);
            assert.lengthOf(items, 2);
            // Delete batch
            yield this._persistence.deleteByIds(null, [dummy1.id, dummy2.id]);
            // Read empty batch
            items = yield this._persistence.getListByIds(null, [dummy1.id, dummy2.id]);
            assert.isArray(items);
            assert.lengthOf(items, 0);
        });
    }
}
exports.DummyPersistenceFixture = DummyPersistenceFixture;
//# sourceMappingURL=DummyPersistenceFixture.js.map