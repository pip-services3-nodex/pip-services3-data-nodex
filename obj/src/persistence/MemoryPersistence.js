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
exports.MemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
/**
 * Abstract persistence component that stores data in memory.
 *
 * This is the most basic persistence component that is only
 * able to store data items of any type. Specific CRUD operations
 * over the data items must be implemented in child classes by
 * accessing <code>this._items</code> property and calling [[save]] method.
 *
 * The component supports loading and saving items from another data source.
 * That allows to use it as a base class for file and other types
 * of persistence components that cache all data in memory.
 *
 * ### Configuration parameters ###
 *
 * - options:
 *     - max_page_size:       Maximum number of items returned in a single page (default: 100)
 *
 * ### References ###
 *
 * - <code>\*:logger:\*:\*:1.0</code>       (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/log.ilogger.html ILogger]] components to pass log messages
 *
 * ### Example ###
 *
 *     class MyMemoryPersistence extends MemoryPersistence<MyData> {
 *
 *         public async getByName(correlationId: string, name: string): Promise<MyData> {
 *             let item = this._items.find((d) => d.name == name);
 *             return item;
 *         });
 *
 *         public set(correlatonId: string, item: MyData): Promise<MyData> {
 *             this._items = this._items.find((d) => d.name != name);
 *             this._items.push(item);
 *             await this.save(correlationId);
 *             return item;
 *         }
 *
 *     }
 *
 *     let persistence = new MyMemoryPersistence();
 *
 *     let item = await persistence.set("123", { name: "ABC" });
 *     item = await persistence.getByName("123", "ABC");
 *     console.log(item);                   // Result: { name: "ABC" }
 */
class MemoryPersistence {
    /**
     * Creates a new instance of the persistence.
     *
     * @param loader    (optional) a loader to load items from external datasource.
     * @param saver     (optional) a saver to save items to external datasource.
     */
    constructor(loader, saver) {
        this._logger = new pip_services3_components_nodex_1.CompositeLogger();
        this._items = [];
        this._opened = false;
        this._maxPageSize = 100;
        this._loader = loader;
        this._saver = saver;
    }
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config) {
        this._maxPageSize = config.getAsIntegerWithDefault("options.max_page_size", this._maxPageSize);
    }
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references) {
        this._logger.setReferences(references);
    }
    /**
     * Checks if the component is opened.
     *
     * @returns true if the component has been opened and false otherwise.
     */
    isOpen() {
        return this._opened;
    }
    /**
     * Opens the component.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    open(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.load(correlationId);
            this._opened = true;
        });
    }
    load(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._loader == null) {
                return null;
            }
            this._items = yield this._loader.load(correlationId);
            this._logger.trace(correlationId, "Loaded %d items", this._items.length);
        });
    }
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    close(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.save(correlationId);
            this._opened = false;
        });
    }
    /**
     * Saves items to external data source using configured saver component.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     */
    save(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._saver == null) {
                return;
            }
            yield this._saver.save(correlationId, this._items);
            this._logger.trace(correlationId, "Saved %d items", this._items.length);
        });
    }
    /**
     * Clears component state.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    clear(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            this._items = [];
            this._logger.trace(correlationId, "Cleared items");
            yield this.save(correlationId);
        });
    }
    /**
     * Gets a page of data items retrieved by a given filter and sorted according to sort parameters.
     *
     * This method shall be called by a public getPageByFilter method from child class that
     * receives FilterParams and converts them into a filter function.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param filter            (optional) a filter function to filter items
     * @param paging            (optional) paging parameters
     * @param sort              (optional) sorting parameters
     * @param select            (optional) projection parameters (not used yet)
     * @returns                 a requested page with data items.
     */
    getPageByFilter(correlationId, filter, paging, sort, select) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = this._items;
            // Filter and sort
            if (typeof filter === "function") {
                items = items.filter(filter);
            }
            if (typeof sort === "function") {
                items = items.sort((a, b) => {
                    let sa = sort(a);
                    let sb = sort(b);
                    if (sa < sb)
                        return -1;
                    if (sa > sb)
                        return 1;
                    return 0;
                });
            }
            // Extract a page
            paging = paging != null ? paging : new pip_services3_commons_nodex_1.PagingParams();
            let skip = paging.getSkip(-1);
            let take = paging.getTake(this._maxPageSize);
            let total = null;
            if (paging.total) {
                total = items.length;
            }
            if (skip > 0) {
                items = items.slice(skip);
            }
            items = items.slice(0, take);
            this._logger.trace(correlationId, "Retrieved %d items", items.length);
            return new pip_services3_commons_nodex_2.DataPage(items, total);
        });
    }
    /**
     * Gets a number of items retrieved by a given filter.
     *
     * This method shall be called by a public getCountByFilter method from child class that
     * receives FilterParams and converts them into a filter function.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param filter            (optional) a filter function to filter items
     * @returns                 a number of data items that satisfy the filter.
     */
    getCountByFilter(correlationId, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = this._items;
            // Filter and sort
            if (typeof filter === "function") {
                items = items.filter(filter);
            }
            this._logger.trace(correlationId, "Counted %d items", items.length);
            return items.length;
        });
    }
    /**
     * Gets a list of data items retrieved by a given filter and sorted according to sort parameters.
     *
     * This method shall be called by a public getListByFilter method from child class that
     * receives FilterParams and converts them into a filter function.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param filter           (optional) a filter function to filter items
     * @param paging           (optional) paging parameters
     * @param sort             (optional) sorting parameters
     * @param select           (optional) projection parameters (not used yet)
     * @returns                a list with found data items.
     */
    getListByFilter(correlationId, filter, sort, select) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = this._items;
            // Apply filter
            if (typeof filter === "function") {
                items = items.filter(filter);
            }
            // Apply sorting
            if (typeof sort === "function") {
                items = items.sort((a, b) => {
                    let sa = sort(a);
                    let sb = sort(b);
                    if (sa < sb)
                        return -1;
                    if (sa > sb)
                        return 1;
                    return 0;
                });
            }
            this._logger.trace(correlationId, "Retrieved %d items", items.length);
            return items;
        });
    }
    /**
     * Gets a random item from items that match to a given filter.
     *
     * This method shall be called by a public getOneRandom method from child class that
     * receives FilterParams and converts them into a filter function.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param filter            (optional) a filter function to filter items.
     * @returns                 a random data item.
     */
    getOneRandom(correlationId, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = this._items;
            // Apply filter
            if (typeof filter === "function") {
                items = items.filter(filter);
            }
            let index = Math.trunc(items.length * Math.random());
            let item = items.length > 0 ? items[index] : null;
            if (item != null) {
                this._logger.trace(correlationId, "Retrieved a random item");
            }
            else {
                this._logger.trace(correlationId, "Nothing to return as random item");
            }
            return item;
        });
    }
    /**
     * Creates a data item.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param item              an item to be created.
     * @returns                 a created data item
     */
    create(correlationId, item) {
        return __awaiter(this, void 0, void 0, function* () {
            // Clone the object
            item = JSON.parse(JSON.stringify(item));
            this._items.push(item);
            this._logger.trace(correlationId, "Created item %s", item['id']);
            yield this.save(correlationId);
            return item;
        });
    }
    /**
     * Deletes data items that match to a given filter.
     *
     * This method shall be called by a public deleteByFilter method from child class that
     * receives FilterParams and converts them into a filter function.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param filter            (optional) a filter function to filter items.
     */
    deleteByFilter(correlationId, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleted = 0;
            for (let index = this._items.length - 1; index >= 0; index--) {
                let item = this._items[index];
                if (filter(item)) {
                    this._items.splice(index, 1);
                    deleted++;
                }
            }
            if (deleted == 0) {
                return;
            }
            this._logger.trace(correlationId, "Deleted %s items", deleted);
            yield this.save(correlationId);
        });
    }
}
exports.MemoryPersistence = MemoryPersistence;
//# sourceMappingURL=MemoryPersistence.js.map