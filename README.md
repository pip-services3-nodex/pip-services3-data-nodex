# <img src="https://uploads-ssl.webflow.com/5ea5d3315186cf5ec60c3ee4/5edf1c94ce4c859f2b188094_logo.svg" alt="Pip.Services Logo" width="200"> <br/> Persistence components for Node.js / ES2017

This module is a part of the [Pip.Services](http://pipservices.org) polyglot microservices toolkit. It contains generic interfaces for data access components as well as abstract implementations for in-memory and file persistence.

The persistence components come in two kinds. The first kind is a basic persistence that can work with any object types and provides only minimal set of operations. 
The second kind is so called "identifieable" persistence with works with "identifable" data objects, i.e. objects that have unique ID field. The identifiable persistence provides a full set or CRUD operations that covers most common cases.

The module contains the following packages:
- **Core** - generic interfaces for data access components. 
- **Persistence** - in-memory and file persistence components, as well as JSON persister class.

<a name="links"></a> Quick links:
* [Memory persistence](http://docs.pipservices.org/toolkit/recipes/memory_persistence/)
* [API Reference](https://pip-services3-nodex.github.io/pip-services3-data-nodex/globals.html)
* [Change Log](CHANGELOG.md)
* [Get Help](http://docs.pipservices.org/get_help/)
* [Contribute](http://docs.pipservices.org/contribute/)

## Use

Install the NPM package as
```bash
npm install pip-services3-data-nodex --save
```

As an example, lets implement persistence for the following data object.

```typescript
import { IIdentifiable } from 'pip-services3-commons-nodex';

export class MyObject implements IIdentifiable {
  public id: string;
  public key: string;
  public value: number;
}
```

Our persistence component shall implement the following interface with a basic set of CRUD operations.

```typescript
export interface IMyPersistence {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MyObject>>;
    
    getOneById(correlationId: string, id: string): Promise<MyObject>;
    
    getOneByKey(correlationId: string, key: string): Promise<MyObject>
    
    create(correlationId: string, item: MyObject): Promise<MyObject>;
    
    update(correlationId: string, item: MyObject): Promise<MyObject>;
    
    deleteById(correlationId: string, id: string): Promise<MyObject>;
}
```

To implement in-memory persistence component you shall inherit `IdentifiableMemoryPersistence`. 
Most CRUD operations will come from the base class. You only need to override `getPageByFilter` method with a custom filter function.
And implement a `getOneByKey` custom persistence method that doesn't exist in the base class.

```typescript
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

export class MyMemoryPersistence extends IdentifableMemoryPersistence {
  public constructor() {
    super();
  }

  private composeFilter(filter: FilterParams): any {
    filter = filter || new FilterParams();
    
    let id = filter.getAsNullableString("id");
    let tempIds = filter.getAsNullableString("ids");
    let ids = tempIds != null ? tempIds.split(",") : null;
    let key = filter.getAsNullableString("key");

    return (item) => {
        if (id != null && item.id != id)
            return false;
        if (ids != null && ids.indexOf(item.id) < 0)
            return false;
        if (key != null && item.key != key)
            return false;
        return true;
    };
  }
  
  public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MyObject>> {
      return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
  }  
  
  public async getOneByKey(correlationId: string, key: string): Promise<MyObject> {
    let item = this._items.find(item => item.key == key);
    
    if (item != null) {
      this._logger.trace(correlationId, "Found object by key=%s", key);
    } else {
      this._logger.trace(correlationId, "Cannot find by key=%s", key);
    }
    
    return item;
  }

}
```

It is easy to create file persistence by adding a persister object to the implemented in-memory persistence component.

```typescript
import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

export class MyFilePersistence extends MyMemoryPersistence {
  protected _persister: JsonFilePersister<MyObject>;

  constructor(path?: string) {
      super();
      this._persister = new JsonFilePersister<MyObject>(path);
      this._loader = this._persister;
      this._saver = this._persister;
  }

  public configure(config: ConfigParams) {
      super.configure(config);
      this._persister.configure(config);
  }
}
```

Configuration for your microservice that includes memory and file persistence may look the following way.

```yaml
...
{{#if MEMORY_ENABLED}}
- descriptor: "myservice:persistence:memory:default:1.0"
{{/if}}

{{#if FILE_ENABLED}}
- descriptor: "myservice:persistence:file:default:1.0"
  path: {{FILE_PATH}}{{#unless FILE_PATH}}"../data/data.json"{{/unless}}
{{/if}}
...
```

## Develop

For development you shall install the following prerequisites:
* Node.js 10+
* Visual Studio Code or another IDE of your choice
* Docker
* Typescript

Install dependencies:
```bash
npm install
```

Compile the code:
```bash
tsc
```

Run automated tests:
```bash
npm test
```

Generate API documentation:
```bash
./docgen.ps1
```

Before committing changes run dockerized build and test as:
```bash
./build.ps1
./test.ps1
./clear.ps1
```

## Contacts

The Node.js version of Pip.Services is created and maintained by:
- **Sergey Seroukhov**

The documentation is written by:
- **Mark Makarychev**
