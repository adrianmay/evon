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

  function run (mech, cas) {
    whenStart = performance.now();
    var co = mech.stringify(cas[0]);
    whenStop = performance.now();
    var en = whenStop-whenStart;
    whenStart = performance.now();
    var re = mech.parse(co);
    whenStop = performance.now();
    var de = whenStop-whenStart;
    su = check(cas[0], re, true, cas[1]);
    return [en, de, su];
  }

  var sample=100, skip=20;
  function ana(s) {
    var su=s[skip][2];
    var en=s[skip][0];
    var de=s[skip][1];
    for (var i=skip+1;i<sample;i++) {
      en+=s[i][0];
      de+=s[i][1];
      if (s[i][2]!==su) su="mixed";
    }
    en/=sample-skip;
    de/=sample-skip;
    return [nicetime(en), nicetime(de), su];
  }
  for (var ca in cases) {
    var cas = cases[ca];
    var js=[], es=[];
    for (var i=0;i<sample*2;i++) {
      if (i%2==1) js.push(run(JSON, cas));
      else es.push(run(EVON, cas));
    }

    show.innerHTML += format([ana(js),ana(es)]);
  }

}

