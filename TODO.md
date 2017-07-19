# to be done for v7.0 of the driver

* Mask `multi` to be added;
* Add support for `one` | `many`, as per the method `oneOrMany` below
* Add method `oneOrMany`, to resolve with 1 object when 1 row is returned,
  and with an array when multiple rows are returned.
* Fully refactor the `query` implementation - make it simpler, and well-split

Argument: The client may dynamically decide to add a query, and in most cases without care
for the second result. A) Should it break single-result methods? B) Should it break method `multi`,
if the second one isn't added?

* Add method `multi`, to resolve with multi-array or reject with a new error
* Add method `multiResult`, to resolve with 

What should I do with the existing methods? - 

A) Reject multi-sets?
B) Use the first one only?

---

# Possible additions, going for pg-promise v7

* Refactor the Custom Types: start using method `toPostgres` and property `_rawType`.
