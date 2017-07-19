# to be done for v7.0 of the driver

* Mask `multi` to be added; DONE!
* Add the new error type; DONE!
* Add support for `one` | `many`, as per the method `oneOrMany` below
* Add method `oneOrMany`, to resolve with 1 object when 1 row is returned, and with an array when multiple rows are returned.
* Fully refactor the `query` implementation - make it simpler, and well-split
* Add method `multi`, to always resolve with multi-array, supporting single-result-sets
* Add method `multiResult`, to resolve with `[Result,...]` always. 

---

# Possible additions, going for pg-promise v7

* Refactor the Custom Types: start using method `toPostgres` and property `_rawType`.
* Possible: some initialization options / use of config?

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
  