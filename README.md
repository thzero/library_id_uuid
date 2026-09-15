![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/library_id_uuid)
![David](https://img.shields.io/david/thzero/library_id_uuid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_id_uuid

Id generation for [@thzero/library_common](https://github.com/thzero/library_common),
backed by [uuid](https://github.com/uuidjs/uuid).

Plain uuid v4, nothing else. Use this one when ids have to be uuids for something
outside the application — a database column type, another system's schema, a
standard you are held to.

**There is no short form.** `generateShortId()` returns a full uuid, and both
translate methods are identity. If you want short ids that are still uuids
underneath, use
[library_id_shortuuid](https://github.com/thzero/library_id_shortuuid); if you
just want short ids, use
[library_id_nanoid](https://github.com/thzero/library_id_nanoid).

## Requirements

### NodeJs

[NodeJs](https://nodejs.org) version 22+

### Installation

[![NPM](https://nodei.co/npm/@thzero/library_id_uuid.png?compact=true)](https://npmjs.org/package/@thzero/library_id_uuid)

```
npm install @thzero/library_id_uuid
```

#### Peer dependencies

None. [uuid](https://github.com/uuidjs/uuid) is a direct dependency.

## What it provides

`index.js` — default export `IdUtility`, a class of statics implementing the
generator contract `library_common` delegates to.

| Member | Behaviour |
|---|---|
| `generateId()` | A uuid v4 — 36 characters |
| `generateLongId()` | The same |
| `generateShortId()` | The same. **Not shorter** — the name belongs to the contract, not to what uuid can do |
| `translateToShortId(id)` / `translateToId(id)` | **Identity.** Returns what it was given |
| `setAlphabet`, `setLengthLong`, `setLengthShort` | **No-ops.** Present for contract compatibility; a uuid's length and alphabet are fixed |

`openSource.js` — a default-exported function returning the licence manifest for
this package and `uuid`, under both the `client` and `server` categories.

## Configuration

None. This package reads no configuration, and the three setters are no-ops
because a uuid's shape is fixed.

## Wiring it up

```js
import IdGenerator from '@thzero/library_id_uuid';

Utility.setIdGenerator(IdGenerator);
```

On the server, through `BootMain`:

```js
import IdGenerator from '@thzero/library_id_uuid';

class AppBootMain extends BootMain {
    _initIdGenerator() {
        return IdGenerator;
    }
}
```

`_initIdGeneratorAlphabet`, `_initIdGeneratorLengthLong` and
`_initIdGeneratorLengthShort` have no effect with this generator.

### Id length matters downstream

At 36 characters these are longer than the framework's default 21, and
`@thzero/library_server_validation_joi`'s `_id` accepts 20 to 30 characters of
`A-Za-z0-9_-` while `_externalId` is `alphanum()`, 3 to 30. A uuid fails **both**
— on length, and on the hyphens:

```
nanoid  "emaWb-utqBPtv6PUQfA8l"                  len=21  idSchema PASSES
uuid    "ed7814df-3080-4a68-9f6d-a428f6d2799c"   len=36  idSchema FAILS
                                                         externalIdSchema FAILS
```

Override `_id` — and `_externalId` if your identity provider hands you uuids — in
your validation service before switching to this generator.

## Development

```
npm run lint       # eslint .
npm run lint:fix   # eslint . --fix
npm test           # node --test "test/*.test.js"
```
