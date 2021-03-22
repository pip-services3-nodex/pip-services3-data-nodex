"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilePersistence = void 0;
const JsonFilePersister_1 = require("./JsonFilePersister");
const MemoryPersistence_1 = require("./MemoryPersistence");
/**
 * Abstract persistence component that stores data in flat files
 * and caches them in memory.
 *
 * This is the most basic persistence component that is only
 * able to store data items of any type. Specific CRUD operations
 * over the data items must be implemented in child classes by
 * accessing this._items property and calling [[save]] method.
 *
 * @see [[MemoryPersistence]]
 * @see [[JsonFilePersister]]
 *
 * ### Configuration parameters ###
 *
 * - path:                path to the file where data is stored
 *
 * ### References ###
 *
 * - <code>\*:logger:\*:\*:1.0</code>   (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/log.ilogger.html ILogger]] components to pass log messages
 *
 * ### Example ###
 *
 *     class MyJsonFilePersistence extends FilePersistence<MyData> {
 *         public constructor(path?: string) {
 *             super(new JsonPersister(path));
 *         }
 *
 *         public async getByName(correlationId: string, name: string): Promise<MyData> {
 *             let item = this._items.find((d) => d.name == name);
 *             retur item;
 *         });
 *
 *         public async set(correlatonId: string, item: MyData): Promise<MyData> {
 *             this._items = this._items.filter((d) => d.name != name);
 *             this._items.push(item);
 *             await this.save(correlationId);
 *             return item;
 *         }
 *
 *     }
 */
class FilePersistence extends MemoryPersistence_1.MemoryPersistence {
    /**
     * Creates a new instance of the persistence.
     *
     * @param persister    (optional) a persister component that loads and saves data from/to flat file.
     */
    constructor(persister) {
        if (persister == null) {
            persister = new JsonFilePersister_1.JsonFilePersister();
        }
        super(persister, persister);
        this._persister = persister;
    }
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config) {
        this._persister.configure(config);
    }
}
exports.FilePersistence = FilePersistence;
//# sourceMappingURL=FilePersistence.js.map