"use strict"

var evon = {
  stringify : function (ob) {
    return JSON.stringify(ob);
  },
  parse : function (s) {
    return JSON.parse(s);
  }
}

module.exports = evon;


