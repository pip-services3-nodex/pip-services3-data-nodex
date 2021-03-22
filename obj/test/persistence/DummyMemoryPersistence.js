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
exports.DummyMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const IdentifiableMemoryPersistence_1 = require("../../src/persistence/IdentifiableMemoryPersistence");
class DummyMemoryPersistence extends IdentifiableMemoryPersistence_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    composeFilter(filter) {
        filter = filter != null ? filter : new pip_services3_commons_nodex_1.FilterParams();
        let key = filter.getAsNullableString("key");
        return (item) => {
            if (key != null && item.key != key)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
        });
    }
    getCountByFilter(correlationId, filter) {
        const _super = Object.create(null, {
            getCountByFilter: { get: () => super.getCountByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getCountByFilter.call(this, correlationId, this.composeFilter(filter));
        });
    }
    getSortedPage(correlationId, sort) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, null, null, sort, null);
        });
    }
    getSortedList(correlationId, sort) {
        const _super = Object.create(null, {
            getListByFilter: { get: () => super.getListByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getListByFilter.call(this, correlationId, null, sort, null);
        });
    }
}
exports.DummyMemoryPersistence = DummyMemoryPersistence;
//# sourceMappingURL=DummyMemoryPersistence.js.map