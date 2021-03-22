/** @module persistence */
/** @hidden */
const fs = require('fs');

import { IConfigurable } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { ConfigException } from 'pip-services3-commons-nodex';
import { FileException } from 'pip-services3-commons-nodex';
import { JsonConverter } from 'pip-services3-commons-nodex';
import { ArrayConverter } from 'pip-services3-commons-nodex';

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
export class JsonFilePersister<T> implements ILoader<T>, ISaver<T>, IConfigurable {
    private _path: string;

    /**
     * Creates a new instance of the persistence.
     * 
     * @param path  (optional) a path to the file where data is stored.
     */
    public constructor(path?: string) {
        this._path = path;
    }

    /**
     * Gets the file path where data is stored.
     * 
     * @returns the file path where data is stored.
     */
    public get path(): string {
        return this._path;
    }

    /**
     * Sets the file path where data is stored.
     * 
     * @param value     the file path where data is stored.
     */
    public set path(value: string) {
        this._path = value;
    }

    /**
     * Configures component by passing configuration parameters.
     * 
     * @param config    configuration parameters to be set.
     */
    public configure(config: ConfigParams): void {
        this._path = config.getAsStringWithDefault("path", this._path);
    }

    /**
     * Loads data items from external JSON file.
     * 
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @returns                a list with loaded data items.
     */
    public async load(correlationId: string): Promise<T[]> {
        if (this._path == null) {
            throw new ConfigException(
                correlationId,
                "NO_PATH",
                "Data file path is not set"
            );
        }

        if (!fs.existsSync(this._path)) {
            return [];
        }

        try {
            let json: any = fs.readFileSync(this._path, "utf8");
            let list = JsonConverter.toNullableMap(json);
            let arr = ArrayConverter.listToArray(list);
            return arr;
        } catch (ex) {
            throw new FileException(
                correlationId,
                "READ_FAILED",
                "Failed to read data file: " + this._path
            ).withCause(ex);
        }
    }

    /**
     * Saves given data items to external JSON file.
     * 
     * @param correlationId    (optional) transaction id to trace execution through call chain.
     * @param items             list if data items to save
     */
    public async save(correlationId: string, items: T[]): Promise<void> {
        try {
            let json = JsonConverter.toJson(items);
            fs.writeFileSync(this._path, json);
        } catch (ex) {
            throw new FileException(
                correlationId,
                "WRITE_FAILED",
                "Failed to write data file: " + this._path
            ).withCause(ex);
        }
    }

}
