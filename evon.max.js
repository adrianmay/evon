"use strict"


//Polyfill constructor.name in IE
//Thanks to Matthew Sharley for this.
if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function() {
            var funcNameRegex = /function\s([^(]{1,})\(/;
            var results = (funcNameRegex).exec((this).toString());
            return (results && results.length > 1) ? results[1].trim() : "";
        },
        set: function(value) {}
    });
}



var EVON = {
  stringify: function (ob) {
    EVON.serial=0;
    EVON.toclean=[];
    var ct = EVON._stringify(ob);
    var k;
    while (k=EVON.toclean.pop()) delete k._evon_serial;
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
      ob._evon_serial = EVON.serial++;
      EVON.toclean.push(ob);
      var ct = "h["+ob._evon_serial+"]="+"new "+ob.constructor.name+"("+(ob.getCtorParams ? ob.getCtorParams() : "")+")";
      for (var k in ob) if (k!=='_evon_serial') if (ob.hasOwnProperty(k))
        ct = "_("+ct+",'"+k+"',"+EVON._stringify(ob[k])+")";
      //ct = "h["+ob._evon_serial+"]="+ct;
      return ct;
    }
  },
  parse : function (s) {
    function _(o,k,v) { o[k]=v; return o;}
    var h=[];
    return eval(s);
  }
}


      /*
      var ct = "(function () { var a = new "+ob.constructor.name+"("+(ob.getCtorParams ? ob.getCtorParams() : "")+");";
      for (var k in ob) if (ob.hasOwnProperty(k))
        ct += "a['"+k+"']="+EVON.stringify(ob[k])+";";
      ct+="})()";
      */
      /*
        var ct = "f(new "+ob.constructor.name+"("+(ob.getCtorParams ? ob.getCtorParams() : "")+"))";
        for (var k in ob) if (ob.hasOwnProperty(k))
          ct += "('"+k+"',"+EVON.stringify(ob[k])+")";
        ct+="()";
      */
     /*
        var ct = "(new "+ob.constructor.name+"("+(ob.getCtorParams ? ob.getCtorParams() : "")+"))";
        for (var k in ob) if (ob.hasOwnProperty(k))
          ct += "._('"+k+"',"+EVON.stringify(ob[k])+")";
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
function konst(k) { return function (x) { return k; } }
*/
//(k,v) {this[k]=v;return this;}


