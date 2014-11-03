evon
====

More accurate than JSON and nearly as fast.

An evon encoding is a javascript program that we eval() to accomplish the restore. 

This is only about 20% slower than JSON.parse and much more flexible, which allows us to be much more accurate.

Compare:

Feature | JSON | evon
---|---|---
Arrays: non-numerically names properties | Discarded | Restored

Evon serialisation preserves non-numerically named properties of arrays, all kinds of sparse entries (without just restoring them all as null) prototypes
