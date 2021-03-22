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
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const DummyPersistenceFixture_1 = require("./DummyPersistenceFixture");
const DummyFilePersistence_1 = require("./DummyFilePersistence");
suite('DummyFilePersistence', () => {
    let persistence;
    let fixture;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new DummyFilePersistence_1.DummyFilePersistence();
        persistence.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples("path", "./data/dummies.json"));
        fixture = new DummyPersistenceFixture_1.DummyPersistenceFixture(persistence);
        yield persistence.open(null);
        yield persistence.clear(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('Crud Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
    test('Batch Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testBatchOperations();
    }));
    test('Sort Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testPageSortingOperations();
    }));
    test('List Sort Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testListSortingOperations();
    }));
});
//# sourceMappingURL=DummyFilePersistence.test.js.map