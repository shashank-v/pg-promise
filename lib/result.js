'use strict';

/**
 * @enum {number}
 * @alias queryResult
 * @readonly
 * @description
 * _Query Result Mask._
 *
 * Binary mask that represents the result expected from queries.
 * It is used by generic {@link Database#query query} method, as well as method {@link Database#func func}.
 *
 * The mask is always the last optional parameter, which defaults to `queryResult.any`.
 *
 * Any combination of flags is supported, except that `multi` cannot be combined with any other flag.
 *
 * The type is available from the library's root: `pgp.queryResult`.
 *
 * @see {@link Database#query Database.query}, {@link Database#func Database.func}
 */
const queryResult = {
    /** Expecting a single result-set, with a single row in it. */
    one: 1,

    /** Expecting a single result-set, with one or more rows in it. */
    many: 2,

    /** Expecting a single result-set, with no rows in it. */
    none: 4,

    /** `many|none` - Expecting a single result-set, with any number of rows in it. */
    any: 6,

    /** Expecting multiple result-sets. */
    multi: 8
};

Object.freeze(queryResult);

module.exports = queryResult;
