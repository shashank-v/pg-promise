# to be done for v7.0 of the driver

* Mask `multi` to be added; DONE!
* Add the new error type; DONE!
* Fully refactor the `query` implementation - make it simpler, and well-split. DONE!
* Add support for `one` | `many`, but no method `oneOrMany`, as it is NOT needed. DONE!
* Add method `multi`, to always resolve with multi-array, supporting single-result-sets. DONE!
* Add method `multiResult`, to resolve with `[Result,...]` always. DONE!

---

# Possible additions, going for pg-promise v7

* Refactor the Custom Types: start using method `toPostgres` and property `_rawType`. DONE!
* Possible: some initialization options / use of config?
* Change how `receive` works?

# other issues

* Event `receive` for multi-results would need to loop through. DONE!
* Method `multi` would have to iterate through all. DONE!
 
# explanations

* All existing methods to reject multi-result-sets, as it is too dangerous and error-prone to just use the first one,
  also opens up to bad logic patterns.
* New methods `multi` and `multiResult` MUST allow single-result-sets to be returned, because dynamic number of queries
  will create a confusion as to how to execute / using which method.
* Methods `multi` and `multiResult` cannot support any iterator, for the same reasons why methods `many`/`any` do not do it - 
  ambiguity in `each` vs `map` logic.

# remaining problems

Method `any` ambiguity. Should it support multi-results? The feeling is that it should!
So it is no longer the same as method `manyOrNone`. SOLVED!

DECIDED: mask and method `any` both represent the result according to the mask:

* resolve with `null`, of no rows returned
* resolve with object, if one row returned
* resolve with array of objects, if one returned
* resolve with array of arrays, if multi-results are returned

# notable changes

* methods map/each now use `rows` instead of `any`
* event `receive` is called multiple times

| mask/rows             | 0            | 1            |   > 1        | multi-result       |
|:---------------------:|:------------:|:------------:|:------------:|:------------------:|
|   `none`	            | `null`       | _error_      | _error_      | _error_            |
|   `one`	            | _error_      | `{}`         | _error_      | _error_            |
|   `many`	            | _error_      | `[{}]`       | `[{}...]`    | _error_            |
|   `multi`             | `[[{}..]..]` | `[[{}..]..]` | `[[{}..]..]` | `[[{}..]..]`       |
|   `any`               | `null`       | `{}`         | `[{}...]`    | `[[{}..]..]`       |
| `none`&`one`          | `null`       | `{}`         | _error_      | _error_            |
| `none`&`many`         | `null`       | `[{}]`       | `[{}...]`    | _error_            |
| `none`&`multi`        | `null`       | `[[{}]]`     | `[[{}...]]`  | `[[{}..]..]`       |
| `none`&`one`&`many`   | `null`       | `{}`         | `[{}...]`    | _error_            |
| `none`&`one`&`multi`  | `null`       | `{}`         | _error_      | `[[{}..]..]`       |
| `none`&`many`&`multi` | `null`       | `[{}]`       | `[{}...]`    | `[[{}..]..]`       |
| `one`&`many`          | _error_      | `{}`         | `[{}...]`    | _error_            |
| `one`&`multi`         | `[[]]`       | `{}`         | `[[{}...]]`  | `[[{}..]..]`       |
| `one`&`many`&`multi`  | `[[]]`       | `{}`         | `[{}...]`    | `[[{}..]..]`       |
| `many`&`multi`        | `[[]]`       | `[{}]`       | `[{}...]`    | `[[{}..]..]`       |


| method/rows   | 0                  | 1                  | > 1                | multi-result       |
|:-------------:|:------------------:|:------------------:|:------------------:|:------------------:|
| `none`	    | `null`             | _error_            | _error_            | _error_            |
| `one`	        | _error_            | `{}`               | _error_            | _error_            |
| `oneOrNone`   | `null`             | `{}`               | _error_            | _error_            |
| `many`        | _error_            | `[{}]`             | `[{}...]`          | _error_            |
| `manyOrNone`  | `null`             | `[{}]`             | `[{}...]`          | _error_            |
| `any`         | `null`             | `{}`               | `[{}...]`          | `[[{}..]..]`       |
| `rows`        | `[]`               | `[{}]`             | `[{}...]`          | _error_            |
| `map`         | `[]`               | `[{}]`             | `[{}...]`          | _error_            |
| `each`        | `[]`               | `[{}]`             | `[{}...]`          | _error_            |
| `result`      | `Result{}`         | `Result{}`         | `Result{}`         | _error_            |
| `proc`        | `null`             | `{}`               | _error_            | _error_            |
| `multi`       | `[[{}..]..]`       | `[[{}..]..]`       | `[[{}..]..]`       | `[[{}..]..]`       |
| `multiResult` | `[[Result{}..]..]` | `[[Result{}..]..]` | `[[Result{}..]..]` | `[[Result{}..]..]` |

This requires addition of method `rows`. Possible alternative names: `all`, `data`, `list`, `enum`, `array`.

PROBLEM: methods `query` + `func` become 100% incompatible with all the code out there today.

TODO:

* I must remove `duration` from everywhere, except the `Result`. DONE!
* Document method `toPostgres` in QueryFile, add it to typescripts too. DONE!

# alternative?

PROBLEM: I don't have a method that would return exactly what I'm getting back, without any transformation.

* Have mask `any` equal 16, and represent `whatever we get`?
