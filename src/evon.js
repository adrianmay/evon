"use strict"

function konst(k) { return function (x) { return k; } }

var evon = {
  stringify: function (ob) {
    evon.serial=0;
    evon.toclean=[];
    var ct = evon._stringify(ob);
    var k;
    while (k=evon.toclean.pop()) delete k._evon_serial;
    //console.log(ct);
    return ct;
  },
  _stringify : function (ob) {
    var t = typeof ob;
    if (t === 'string') return '"'+ob+'"';
    else if (t !== 'object' || ob instanceof RegExp || ob==null) return (ob); 
    else {
      if (ob._evon_serial!==undefined)
        return "h["+ob._evon_serial+"]"
      var ct = "new "+ob.constructor.name+"("+(ob.getCtorParams ? ob.getCtorParams() : "")+")";
      for (var k in ob) if (ob.hasOwnProperty(k))
        ct = "_("+ct+",'"+k+"',"+evon._stringify(ob[k])+")";
      ob._evon_serial=evon.serial++;
      evon.toclean.push(ob);
      ct = "h["+ob._evon_serial+"]="+ct;
      return ct;
    }
  },
  parse : function (s) {
    var h=[];
    return eval(s);
  }
}

function _(o,k,v) { o[k]=v; return o;}

      /*
      var ct = "(function () { var a = new "+ob.constructor.name+"("+(ob.getCtorParams ? ob.getCtorParams() : "")+");";
      for (var k in ob) if (ob.hasOwnProperty(k))
        ct += "a['"+k+"']="+evon.stringify(ob[k])+";";
      ct+="})()";
      */
      /*
        var ct = "f(new "+ob.constructor.name+"("+(ob.getCtorParams ? ob.getCtorParams() : "")+"))";
        for (var k in ob) if (ob.hasOwnProperty(k))
          ct += "('"+k+"',"+evon.stringify(ob[k])+")";
        ct+="()";
      */
     /*
        var ct = "(new "+ob.constructor.name+"("+(ob.getCtorParams ? ob.getCtorParams() : "")+"))";
        for (var k in ob) if (ob.hasOwnProperty(k))
          ct += "._('"+k+"',"+evon.stringify(ob[k])+")";
          */
/*
var f = function(o) {
  return function(k,v) {
    if (k===undefined)
      return o;
    o[k]=v;
    return f(o);
  }
}
*/
//(k,v) {this[k]=v;return this;}

module.exports = evon;


