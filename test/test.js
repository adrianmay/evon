function comp_simple_arrays(as, bs) {
  if (as.length == 0 && bs.length == 0)
    return true;
  if (as.pop() === bs.pop())
    return comp_simple_arrays(as, bs);
  else return false;
}

function check_deep(a, b, exact) {
  var ap=[], bp=[]
  for (var k in a) if (a.hasOwnProperty(k))
    ap.push(k)
  for (var k in b) if (a.hasOwnProperty(k))
    bp.push(k)
  ap.sort();
  bp.sort();
  if (!comp_simple_arrays(ap, bp))
    return false;
  //Just wrecked ap and bp
  for (var k in a) if (a.hasOwnProperty(k)) {
    if (!check(a[k], b[k], exact))
      return false;
  }
  return true;
}

function check(a, b, exact, extra) {
  if (typeof a !== typeof b) 
    return false;
  if (typeof a === 'function') 
    return (a.toString()===b.toString());
  if (typeof a !== 'object') 
    return (a===b);
  if (!check_deep(a, b, exact))
    return false;
  if (exact) {
    if (a.constructor !== b.constructor)
      return false;
    if (!check(Object.getPrototypeOf(a), Object.getPrototypeOf(a), false)) 
      return false;
  }
  if (extra)
    return extra(a,b);
  return true;
}

if (cases===undefined) {
  console.log("Please include some cases")
  throw 0;
}

var whenStart, whenStop; 

function go() {
  var show = document.getElementById('show');

  function format(res) {
    //res is [jres, eres] where xres is [encoding time, decoding time, suc]
    function el(e) {
      return function(body) {
        return "<"+e+">"+body+"</"+e+">"
      }
    }
    return el("tr")( el("td")(res[0][0]) + el("td")(res[0][1]) + el("td")(res[0][2]) + el("td")(res[1][0]) + el("td")(res[1][1]) + el("td")(res[1][2])  ) 
  }

  function nicetime(n) { return Math.floor(n*1000000).toLocaleString(); }

  for (var ca in cases) {
    var cas = cases[ca];

    whenStart = performance.now();
    var j_co = JSON.stringify(cas[0]);
    whenStop = performance.now();
    var j_en = nicetime(whenStop-whenStart);

    whenStart = performance.now();
    var j_re = JSON.parse(j_co);
    whenStop = performance.now();
    var j_de = nicetime(whenStop-whenStart);

    j_su = check(cas[0], j_re, true, cas[1]);

    whenStart = performance.now();
    var e_co = EVON.stringify(cas[0]);
    whenStop = performance.now();
    var e_en = nicetime(whenStop-whenStart);

    whenStart = performance.now();
    var e_re = EVON.parse(e_co);
    whenStop = performance.now();
    var e_de = nicetime(whenStop-whenStart);

    e_su = check(cas[0], e_re, true, cas[1]);

    show.innerHTML += format([ [j_en, j_de, j_su], [e_en, e_de, e_su] ]);
  }

}

