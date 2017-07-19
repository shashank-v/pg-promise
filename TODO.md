# to be done for v7.0 of the driver

* Mask `multi` to be added; DONE!
* Add the new error type; DONE!
* Fully refactor the `query` implementation - make it simpler, and well-split
* Add support for `one` | `many`, but no method `oneOrMany`, as it is NOT needed.
* Add method `multi`, to always resolve with multi-array, supporting single-result-sets
* Add method `multiResult`, to resolve with `[Result,...]` always. 

---

# Possible additions, going for pg-promise v7

* Refactor the Custom Types: start using method `toPostgres` and property `_rawType`.
* Possible: some initialization options / use of config?
* Change how `receive` works?

# other issues

* Event `receive` for multi-results would need to loop through
* Method `multi` would have to iterate through all;
 
# explanations

* All existing methods to reject multi-result-sets, as it is too dangerous and error-prone to just use the first one,
  also opens up to bad logic patterns.
* New methods `multi` and `multiResult` MUST allow single-result-sets to be returned, because dynamic number of queries
  will create a confusion as to how to execute / using which method.
* Methods `multi` and `multiResult` cannot support any iterator, for the same reasons why methods `many`/`any` do not do it - 
  ambiguity in `each` vs `map` logic.

# remaining problems

Method `any` ambiguity. Should it support multi-results? The feeling is that it should!
So it is no longer the same as method `manyOrNone`.

DECIDED: mask and method `any` both represent the result according to the mask:

* resolve with `null`, of no rows returned
* resolve with object, if one row returned
* resolve with array of objects, if one returned
* resolve with array of arrays, if multi-results are returned

# notable changes

* methods map/each now use `manyOrNone` instead of `any`
* event `receive` is called multiple times
 