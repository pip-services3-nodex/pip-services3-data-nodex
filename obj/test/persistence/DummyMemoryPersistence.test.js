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
const DummyMemoryPersistence_1 = require("./DummyMemoryPersistence");
suite('DummyMemoryPersistence', () => {
    let persistence;
    let fixture;
    setup(() => {
        persistence = new DummyMemoryPersistence_1.DummyMemoryPersistence();
        persistence.configure(new pip_services3_commons_nodex_1.ConfigParams());
        fixture = new DummyPersistenceFixture_1.DummyPersistenceFixture(persistence);
    });
    test('Crud Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
    test('Batch Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testBatchOperations();
    }));
    test('Page Sort Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testPageSortingOperations();
    }));
    test('List Sort Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testListSortingOperations();
    }));
});
//# sourceMappingURL=DummyMemoryPersistence.test.js.map