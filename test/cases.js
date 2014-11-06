var string1024="0123456789ABCDEF";
string1024 = string1024 + string1024 + string1024 + string1024 + string1024 + string1024 + string1024 + string1024 ;
string1024 = string1024 + string1024 + string1024 + string1024 + string1024 + string1024 + string1024 + string1024 ;
var aylen=1024;
var ay = new Array(aylen);
for (var i=0;i<aylen;i++) { 
  ay[i]=string1024;
}

var stable = [null, null, null, null, null];
function Animal() {}
Animal.prototype.constructor=Animal;
function Horse(i) { this.stable = i; if (i!==undefined) stable[i] = this;}
Horse.prototype=new Animal();
Horse.prototype.constructor=Horse;
Horse.prototype.getCtorParams = function() {
  return this.stable;
};
var dobbin = new Horse(2);
dobbin.name='dobbin';
var stable = [null, null, null, null, null];

var cases = { 
  und: [undefined, null ],
  nul: [null, null ],
  str: [ "rabbit", null ],
  num: [ 42, null ],
  tru: [ true, null ],
  fls: [ false, null ],
  rex: [ /.?/, null], 
  obj: [ { foo: 'bar', two: 2}, null ],
  arr: [ ['the', 3, 'bears'], null ],
  bigarray: [ ay, null ],
  horse: [dobbin, function(a,b) { return (stable[2]===b);}],
  nested: [ [ 1, "two", {foo:'bar',two:2}, undefined, null, [10,20,30,40], true]],
  multiref: [ [], function(a,b) { b[0][0].that[0]='big'; return (b[1][0].that[0]=='big');} ],
  circ: [ { name: 'round and round'}, null]
};

var multipig = [ 
  { that: ['little', 'piggy'], went: [2, 'market'] }, 
  { that: ['little', 'piggy'], stayed: "home" }, 
  { that: ['little', 'piggy'], had: ['roast','beef'] }, 
  { that: ['little', 'piggy'], had: 0 } 
]
for (var i=0;i<100;i++) 
  cases.multiref[0].push(multipig);

cases.circ[0].selfref = cases.circ[0];

