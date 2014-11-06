


function comp_simple_arrays(as, bs) {
  if (as.length == 0 && bs.length == 0)
    return true;
  if (as.pop() === bs.pop())
    return comp_simple_arrays(as, bs);
  else return false;
}

function check_deep(a, b, exclude) {
  var ap=[], bp=[]
  for (var k in a) if (a.hasOwnProperty(k)) //recursing too deep
    ap.push(k)
  for (var k in b) if (a.hasOwnProperty(k))
    bp.push(k)
  ap.sort();
  bp.sort();
  if (!comp_simple_arrays(ap, bp))
    return false;
  //Just wrecked ap and bp
  for (var k in a) if (a.hasOwnProperty(k)) {
    if (!check(a[k], b[k], undefined, exclude))
      return false;
  }
  return true;
}

function contains(arr, obj) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] == obj) return true;
  }
}

function check(a, b, extra, exclude) {
  if (typeof a !== typeof b) 
    return false;
  if (typeof a === 'function') 
    return (a.toString()===b.toString());
  if (typeof a !== 'object') 
    return (a===b);
  if (a===null && b===null)
    return true;
  if (contains(exclude,a))
    return true;
  exclude.push(a);
  if (!check_deep(a, b, exclude))
    return false;
  if (a.constructor !== b.constructor)
    return false;
  if (!check(Object.getPrototypeOf(a), Object.getPrototypeOf(a), undefined, exclude)) 
    return false;
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

  function format(title, res) {
    //res is [jres, eres] where xres is [encoding time, decoding time, suc]
    function el(e) {
      return function(body) {
        return "<"+e+">"+body+"</"+e+">"
      }
    }
    return el("tr")( el("td")(title) + 
                    el("td")(viewable(res[0][0])) + 
                    el("td")(String(res[0][0]).length) + 
                    el("td")(res[0][1]) + 
                    el("td")(res[0][2]) + 
                    el("td")(res[0][3]) + 
                    el("td")(viewable(res[1][0])) + 
                    el("td")(String(res[1][0]).length) + 
                    el("td")(res[1][1]) + 
                    el("td")(res[1][2]) + 
                    el("td")(res[1][3])  ) 
  }

  function nicetime(n) { return Math.floor(n*1000000).toLocaleString(); }

  function run (mech, cas) {
    try {
      whenStart = performance.now();
      var co = mech.stringify(cas[0]);
      whenStop = performance.now();
    } catch (e) {
      return [e, 0, 0, false];
    }
    var en = whenStop-whenStart;
    try {
      whenStart = performance.now();
      var re = mech.parse(co);
      whenStop = performance.now();
    } catch (e) {
      return [co, en, 0, false];
    }
    var de = whenStop-whenStart;
    su = check(cas[0], re, cas[1], []);
    return [co, en, de, su];
  }

  function viewable(s) {
    if (typeof s === 'string') return s.substring(0,30);
    else return String(s);
  }

  //var sample=1, skip=0;
  var sample=50, skip=10;
  function ana(s) {
    var su=s[skip][3];
    var en=s[skip][1];
    var de=s[skip][2];
    for (var i=skip+1;i<sample;i++) {
      en+=s[i][1];
      de+=s[i][2];
      if (s[i][3]!==su) su="mixed";
    }
    en/=sample-skip;
    de/=sample-skip;
    return [s[skip][0], nicetime(en), nicetime(de), su];
  }
  for (var ca in cases) if (cases.hasOwnProperty(ca)){
    var cas = cases[ca];
    var js=[], es=[];
    for (var i=0;i<sample*2;i++) {
      if (i%2==1) js.push(run(JSON, cas));
      else es.push(run(EVON, cas));
    }

    show.innerHTML += format(ca, [ana(js),ana(es)]);
  }

}

