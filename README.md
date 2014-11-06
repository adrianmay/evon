evon
====

More accurate than JSON and nearly as fast.

An evon encoding is a javascript program that we eval() to accomplish the restore. 

This is much more flexible and accurate than JSON, and the speed is still respectable.

Compare:

Feature | JSON | evon
---|---|---
Arrays: non-numerically named properties | Discarded | Restored
Arrays: Sparse entries | All restored as null | Distinction made between null, undefined and non-existent. Length restored accurately
Prototype | Discarded | Restored if object.constructor evaluates to a constructor function
Constructor parameters | No constructor ever called anyway | object.getCtorParams() may return a list of parameters to pass to the constructor upon restoration. Versions for Date etc provided
Circular references | Explicitly bottles out | Restored
Multiple references to same object | Object duplicated | Restored correctly

You can run http://adrianmay.github.io/evon/test/test.html to compare the performance with JSON.

