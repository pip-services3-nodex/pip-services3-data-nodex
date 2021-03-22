"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('chai').assert;
const JsonFilePersister_1 = require("../../src/persistence/JsonFilePersister");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
suite('JsonFilePersister', () => {
    let _persister;
    setup(() => {
        _persister = new JsonFilePersister_1.JsonFilePersister();
    });
    test('Configure With No Path Key', () => {
        try {
            _persister.configure(new pip_services3_commons_nodex_1.ConfigParams());
        }
        catch (ex) {
            assert.isNotNull(ex);
            assert.isTrue(ex instanceof pip_services3_commons_nodex_2.ConfigException);
        }
    });
    test('Configure If Path Key Check Property', () => {
        let fileName = "../JsonFilePersisterTest";
        _persister.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples("path", fileName));
        assert.equal(fileName, _persister.path);
    });
});
//# sourceMappingURL=JsonFilePersister.test.js.map