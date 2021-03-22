import { IConfigurable } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { ILoader } from '../ILoader';
import { ISaver } from '../ISaver';
/**
 * Persistence component that loads and saves data from/to flat file.
 *
 * It is used by [[FilePersistence]], but can be useful on its own.
 *
 * ### Configuration parameters ###
 *
 * - path:          path to the file where data is stored
 *
 * ### Example ###
 *
 *     let persister = new JsonFilePersister("./data/data.json");
 *
 *     await persister.save("123", ["A", "B", "C"]);
 *     ...
 *     let items = await persister.load("123");
 *     console.log(items);                      // Result: ["A", "B", "C"]
 */
export declare class JsonFilePersister<T> implements ILoader<T>, ISaver<T>, IConfigurable {
    private _path;
    /**
     * Creates a new instance of the persistence.
     *
     * @param path  (optional) a path to the file where data is stored.
     */
    constructor(path?: string);
    /**
     * Gets the file path where data is stored.
     *
     * @returns the file path where data is stored.
     */
    get path(): string;
    /**
     * Sets the file path where data is stored.
     *
     * @param value     the file path where data is stored.
     */
    set path(value: string);
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config: ConfigParams): void;
    /**
     * Loads data items from external JSON file.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @returns                a list with loaded data items.
     */
    load(correlationId: string): Promise<T[]>;
    /**
     * Saves given data items to external JSON file.
     *
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param items             list if data items to save
     */
    save(correlationId: string, items: T[]): Promise<void>;
}
