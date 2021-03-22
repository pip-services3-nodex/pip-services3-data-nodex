"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFilePersister = exports.IdentifiableFilePersistence = exports.FilePersistence = exports.IdentifiableMemoryPersistence = exports.MemoryPersistence = void 0;
/**
 * @module persistence
 *
 * Todo: Rewrite this description.
 *
 * @preferred
 * Contains various persistence implementations (InMemory and File –persistences). These are
 * "abstract" persistences, which only connect to data sources and do not implement the operations
 * and methods for working the data. The classes that extend these persistences must implement this
 * logic on their own.
 *
 * Identifiable Persistences work with Identifiable objects, which have primary keys. A few standard
 * operations are defined by default for these objects: reading arrays and data pages; searching for
 * an object by its id; and creating, updating, and deleting records of objects.
 */
var MemoryPersistence_1 = require("./MemoryPersistence");
Object.defineProperty(exports, "MemoryPersistence", { enumerable: true, get: function () { return MemoryPersistence_1.MemoryPersistence; } });
var IdentifiableMemoryPersistence_1 = require("./IdentifiableMemoryPersistence");
Object.defineProperty(exports, "IdentifiableMemoryPersistence", { enumerable: true, get: function () { return IdentifiableMemoryPersistence_1.IdentifiableMemoryPersistence; } });
var FilePersistence_1 = require("./FilePersistence");
Object.defineProperty(exports, "FilePersistence", { enumerable: true, get: function () { return FilePersistence_1.FilePersistence; } });
var IdentifiableFilePersistence_1 = require("./IdentifiableFilePersistence");
Object.defineProperty(exports, "IdentifiableFilePersistence", { enumerable: true, get: function () { return IdentifiableFilePersistence_1.IdentifiableFilePersistence; } });
var JsonFilePersister_1 = require("./JsonFilePersister");
Object.defineProperty(exports, "JsonFilePersister", { enumerable: true, get: function () { return JsonFilePersister_1.JsonFilePersister; } });
//# sourceMappingURL=index.js.map