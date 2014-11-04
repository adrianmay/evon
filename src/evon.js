"use strict"

function konst(k) { return function (x) { return k; } }



var ctorParamExtractors={ }
var evon = {
  stringify : function (ob) {
    var t = typeof ob;
    if (t === 'string') return '"'+ob+'"';
    else if (t !== 'object' || ob instanceof RegExp || ob==null) return (ob); 
    else {
      var ct = "(new "+ob.constructor.name+"("+(ob.getCtorParams ? ob.getCtorParams() : "")+")";
      for (var k in ob) if (ob.hasOwnProperty(k))
        ct += "._('"+k+"',"+evon.stringify(ob[k])+")";
      ct+=")";
//      console.log(ct);
      return ct;
    }
  },
  parse : function (s) {
    return eval(s);
  }
}

Object.prototype._ = function(k,v) {this[k]=v;return this;}

module.exports = evon;


