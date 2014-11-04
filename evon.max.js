(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



},{}],2:[function(require,module,exports){
(function (global){
global.EVON = require('./evon');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./evon":1}]},{},[2]);
