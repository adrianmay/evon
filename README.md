evon
====

More accurate than JSON and nearly as fast.

An evon encoding is a javascript program that we eval() to accomplish the restore. 

This is only about 20% slower than JSON.parse and much more flexible, which allows us to be much more accurate.

Compare:

Feature | JSON | evon
---|---|---
Arrays: non-numerically named properties | Discarded | Restored
Arrays: Sparse entries | All restored as null | Distinction made between null, undefined and non-existent. Length restored accurately
Prototype | Discarded | Restored if object.constructor evaluates to a constructor function
Constructor parameters | No constructor ever called anyway | object.constructorParameters() may return a list of parameters to pass to the constructor upon restoration. Versions for Date etc provided

