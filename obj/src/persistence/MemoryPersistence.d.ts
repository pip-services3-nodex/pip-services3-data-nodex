/** @module persistence */
import { IReferenceable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IOpenable } from 'pip-services3-commons-nodex';
import { ICleanable } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { CompositeLogger } from 'pip-services3-components-nodex';
import { ILoader } from '../ILoader';
import { ISaver } from '../ISaver';
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
export declare class MemoryPersistence<T> implements IConfigurable, IReferenceable, IOpenable, ICleanable {
    protected _logger: CompositeLogger;
    protected _items: T[];
    protected _loader: ILoader<T>;
    protected _saver: ISaver<T>;
    protected _opened: boolean;
    protected _maxPageSize: number;
    /**
     * Creates a new instance of the persistence.
     *
     * @param loader    (optional) a loader to load items from external datasource.
     * @param saver     (optional) a saver to save items to external datasource.
     */
    constructor(loader?: ILoader<T>, saver?: ISaver<T>);
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config: ConfigParams): void;
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references: IReferences): void;
    /**
     * Checks if the component is opened.
     *
     * @returns true if the component has been opened and false otherwise.
     */
    isOpen(): boolean;
    /**
     * Opens the component.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    open(correlationId: string): Promise<void>;
    protected load(correlationId: string): Promise<void>;
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    close(correlationId: string): Promise<void>;
    /**
     * Saves items to external data source using configured saver component.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     */
    save(correlationId: string): Promise<void>;
    /**
     * Clears component state.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    clear(correlationId: string): Promise<void>;
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
    protected getPageByFilter(correlationId: string, filter: any, paging: PagingParams, sort: any, select: any): Promise<DataPage<T>>;
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
    protected getCountByFilter(correlationId: string, filter: any): Promise<number>;
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
    protected getListByFilter(correlationId: string, filter: any, sort: any, select: any): Promise<T[]>;
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
    protected getOneRandom(correlationId: string, filter: any): Promise<T>;
    /**
     * Creates a data item.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param item              an item to be created.
     * @returns                 a created data item
     */
    create(correlationId: string, item: T): Promise<T>;
    /**
     * Deletes data items that match to a given filter.
     *
     * This method shall be called by a public deleteByFilter method from child class that
     * receives FilterParams and converts them into a filter function.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param filter            (optional) a filter function to filter items.
     */
    protected deleteByFilter(correlationId: string, filter: any): Promise<void>;
}
